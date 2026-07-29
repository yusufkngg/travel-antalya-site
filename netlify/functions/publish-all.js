// Merges every Decap CMS editorial-workflow draft branch (cms/*) into main.
// Protected: only runs for a logged-in Netlify Identity user.

exports.handler = async function (event, context) {
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Not logged in." }) };
  }

  const TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.GITHUB_OWNER;
  const REPO = process.env.GITHUB_REPO;

  if (!TOKEN || !OWNER || !REPO) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing GITHUB_TOKEN, GITHUB_OWNER or GITHUB_REPO environment variable." }) };
  }

  const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "travel-antalya-publish-all",
  };

  try {
    const branchesRes = await fetch(`${apiBase}/branches?per_page=100`, { headers });
    if (!branchesRes.ok) {
      const text = await branchesRes.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Could not list branches", detail: text }) };
    }
    const branches = await branchesRes.json();
    const draftBranches = branches
      .map((b) => b.name)
      .filter((name) => name.startsWith("cms/"));

    if (draftBranches.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ merged: [], message: "No draft branches waiting to publish." }) };
    }

    const merged = [];
    const failed = [];

    for (const branch of draftBranches) {
      const mergeRes = await fetch(`${apiBase}/merges`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          base: "main",
          head: branch,
          commit_message: `Publish: ${branch} (via Publish All)`,
        }),
      });

      if (mergeRes.ok || mergeRes.status === 204) {
        merged.push(branch);
        // best-effort cleanup of the merged draft branch
        await fetch(`${apiBase}/git/refs/heads/${encodeURIComponent(branch.replace("cms/", ""))}`, {
          method: "DELETE",
          headers,
        }).catch(() => {});
      } else {
        const detail = await mergeRes.text();
        failed.push({ branch, detail });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ merged, failed, message: `Published ${merged.length} draft(s).` }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
