# Travel Antalya — Siteyi Yayınlama Rehberi

Bu site düz HTML/CSS ile yazıldı — hiçbir kurulum (npm, build vb.) gerektirmiyor.
Barındırma tamamen ücretsiz olabilir (Netlify).

## 1. GitHub'a yükle
1. github.com'da ücretsiz hesap açın (yoksa).
2. Yeni bir repo oluşturun, örn: `travel-antalya-site`.
3. Bu klasördeki tüm dosyaları o repoya yükleyin (GitHub'ın web arayüzünden "Add file → Upload files" ile sürükle-bırak yapabilirsiniz, terminal gerekmez).

## 2. Netlify'a bağla
1. netlify.com'da ücretsiz hesap açın.
2. "Add new site" → "Import an existing project" → GitHub'ı seçip repoyu bağlayın.
3. Build ayarlarını boş bırakın (build command yok, publish directory: `/` — kök klasör). Deploy edin.
4. Birkaç saniyede siteniz bir `xxxx.netlify.app` adresinde canlı olur.

## 3. Kendi domain'inizi bağla
1. Netlify'da "Domain settings" → "Add custom domain" → `travel-antalya.com` yazın.
2. Netlify size birkaç DNS kaydı verir (genelde bir A kaydı + CNAME).
3. Bu kayıtları domain'i aldığınız yerin (GoDaddy, Namecheap vb.) DNS panelinden ekleyin.
4. DNS yayılması birkaç saat sürebilir, sonra travel-antalya.com direkt bu siteye gider.

## 4. İçerik ekleme panelini (admin) aktif et
1. Netlify'da "Identity" sekmesini açın → "Enable Identity".
2. "Services" → "Git Gateway" → "Enable Git Gateway".
3. "Identity" → "Invite users" ile kendinizi davet edin, gelen maildeki linkten şifre belirleyin.
4. Artık `travel-antalya.com/admin` (veya `xxxx.netlify.app/admin`) adresine gidip giriş yapabilirsiniz — orada blog yazısı, restoran, otel, etkinlik eklemek tamamen form doldurmak gibi olur, kod yok, admin panel çökmesi yok.

## Bundan sonra ne olur?
- Yeni bir blog yazısı veya restoran eklediğinizde, admin panel bunu otomatik olarak GitHub'a kaydeder ve site birkaç saniye içinde güncellenir.
- Mobilden de `/admin` adresine tarayıcıdan girip içerik ekleyebilirsiniz.
- Tema/tasarımda değişiklik gerekirse (örn. yeni bir sayfa, renk değişikliği) bunun için bana gelirsiniz, ben dosyaları güncellerim.

## SEO kurulumu (bu turda eklendi)
- `sitemap.xml` ve `robots.txt` — kök dizinde, otomatik olarak travel-antalya.com/sitemap.xml adresinde yayınlanır.
- `_redirects` — eski WordPress URL'lerini (örn. `/kaputas-beach-travel-antalya/`) yeni sayfalara 301 ile yönlendirir. Bu dosya sadece Netlify'a deploy edilince otomatik çalışır, ekstra kurulum gerekmez.
- Her blog yazısında `BlogPosting` schema + canonical + Open Graph etiketleri var. Kaputaş yazısındaki orijinal FAQ schema korundu.
- Ana sayfada `Organization` + `WebSite` schema var.

**Domain'i yeni siteye yönlendirmeden önce hâlâ eksik olanlar:**
- `/about/` ve `/privacy-policy/` — şimdilik ana sayfaya yönlendiriyor, gerçek sayfalar üretilmedi.
- "Current Antalya Weather" yazısındaki canlı hava durumu widget'ı yeni domain'de test edilmeli (API çağrısı CORS'a takılabilir).
- Fotoğraflar orijinal boyutlarında (bazıları 1MB+) — yayına almadan önce sıkıştırma faydalı olur.
