module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("guide");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("index.html");

  eleventyConfig.addFilter("slugify", function (str) {
    return String(str)
      .toLowerCase()
      .replace(/[çğıöşü]/g, (c) => ({ç:'c',ğ:'g',ı:'i',ö:'o',ş:'s',ü:'u'}[c]))
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addCollection("hotels", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/hotels/*.md").sort((a, b) => {
      return (a.data.title || "").localeCompare(b.data.title || "");
    });
  });

  eleventyConfig.addCollection("restaurants", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/restaurants/*.md").sort((a, b) => {
      return (a.data.title || "").localeCompare(b.data.title || "");
    });
  });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
