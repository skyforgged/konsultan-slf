# Audit Masalah Tersembunyi — 2026-10-15

**Branch:** `audit/hidden-issues-2026-10-15` (dari `main` @ `b65f7d3`)
**Metode:** checkout lokal, `npm ci`, `npm run build` (lulus sebelum dan sesudah perubahan), pembacaan seluruh `src/`, `scripts/`, konfigurasi, dan analisis struktural semua HTML di `dist/`. Setiap temuan di bagian A direproduksi atau dibuktikan dengan eksperimen sebelum diperbaiki.

**Aturan klasifikasi**
- **A. Defek terverifikasi** — perilaku salah yang dapat direproduksi, atau celah yang membuat kegagalan lolos tanpa terdeteksi. Diperbaiki di branch ini, satu commit per temuan.
- **B. Need to review** — aplikasi berjalan; ini keputusan desain/konten/arsitektur. **Tidak diubah.**

## A. Defek terverifikasi (diperbaiki)

| # | Temuan | Bukti | Commit |
|---|---|---|---|
| A1 | Enam halaman detail layanan memakai **SVG** sebagai `og:image`/`twitter:image`. Crawler sosial (Facebook, LinkedIn, WhatsApp, X) tidak merender SVG, sehingga tautan layanan tampil tanpa gambar. Fallback PNG yang ditambahkan sebelumnya hanya berlaku untuk artikel. Validator lama hanya memeriksa file ada, bukan formatnya. | `dist/services/*/index.html` berisi `.../illustrations/*.svg`. Validator baru gagal dengan 12 isu pada build lama dan lulus pada build baru. | `fix(seo)` |
| A2 | Tanggal artikel dapat **mundur sehari** bila build berjalan di zona waktu barat UTC. `pubDate` berformat tanggal-saja (UTC tengah malam) tetapi ditampilkan dengan zona waktu mesin build. | `TZ=America/Los_Angeles`: `datetime="2026-10-15…"` tampil "14 Oktober 2026". Setelah perbaikan: 15 Oktober pada kedua zona. | `fix(content)` |
| A3 | Template artikel **tidak punya `<main>`** (beranda, layanan, indeks, 404 punya). Pengguna pembaca layar tidak bisa melompat ke konten utama. | 0 elemen `<main>` pada kedua artikel; 1 setelah perbaikan. | `fix(a11y)` |
| A4 | `/articles/` memiliki urutan heading **h1 → h3** (loncat tingkat). | Outline lama `h1, h3, h3`; kini `h1, h2, h2`. `ArticleCard` menerima `headingLevel`; default tetap 3 sehingga halaman lain tidak berubah. | `fix(a11y)` |
| A5 | Skema menerima `id` pada blok `card/faq/cta/table/note/steps/stats/glossary/quote`, `validateContentRelations()` memeriksa keunikannya, tetapi komponen **tidak pernah menulisnya ke HTML**. Anchor ke blok tersebut mustahil berfungsi. | `id: "faq-checklist-slf"` ada di front matter, 0 kemunculan di HTML; 1 setelah perbaikan. | `fix(blocks)` |
| A6 | Skema layanan mengizinkan string kosong pada `faq`, `requirements`, `benefits` (artikel tidak). String kosong menghasilkan entri FAQPage JSON-LD tidak valid dan `<summary>` kosong. | Uji negatif: pertanyaan FAQ kosong kini menggagalkan build. | `fix(schema)` |
| A7 | **Origin placeholder lolos ke produksi tanpa terdeteksi.** Jika `SITE_URL` dan `VERCEL_PROJECT_PRODUCTION_URL` tidak tersedia saat build, canonical, sitemap, dan robots memakai `http://konsultan-slf.lan`. Semua validator hanya menguji konsistensi antar-origin, bukan kebenarannya. | Build lokal tanpa env menghasilkan `.lan` dan lulus seluruh pemeriksaan. Guard baru gagal (exit 1) pada `VERCEL_ENV=production` dengan origin `.lan`, lulus dengan URL nyata. | `feat(ci)` |
| A8 | Workflow CI tanpa blok `permissions`, sehingga token mewarisi cakupan default repositori. Job hanya perlu membaca. | `permissions: contents: read`. | `chore(ci)` |

> **Perhatian — A7 satu-satunya perubahan yang dapat mempengaruhi deployment.** Jika build produksi Vercel gagal karena guard ini, berarti canonical produksi memang salah sebelum perubahan; atur `SITE_URL` di proyek Vercel. Commit ini terpisah dan dapat di-revert tanpa memengaruhi yang lain.

## B. Need to review (tidak diubah)

| # | Temuan | Mengapa tidak diubah |
|---|---|---|
| B1 | **Tidak ada jalur kontak di seluruh situs.** Build berisi 0 tautan `wa.me`. CTA beranda → `/services/`; CTA layanan berlabel "Diskusikan/Konsultasikan…" menuju `/articles/`; CTA artikel → `/services/`. Blok `cta` (WhatsApp) tidak dipakai di konten terbit. | Audit sebelumnya menetapkan kanal kontak tidak boleh ditambahkan tanpa konfirmasi pemilik. Namun ini kemungkinan temuan berdampak bisnis terbesar. |
| B2 | Teks dan URL "Rujukan resmi" **di-hardcode di `services/[slug].astro`** dan identik untuk keenam layanan (termasuk as-built dan pengkajian teknis). | Melanggar aturan theme/data di `AGENTS.md`; relevansi rujukan per layanan adalah keputusan editorial. |
| B3 | `validateContentRelations()` hanya dipanggil dari `index.astro`. Di `astro dev`, validasi hanya jalan saat `/` dibuka. | Keputusan arsitektur (integrasi Astro atau panggilan dari `getStaticPaths`). |
| B4 | Kode mati: `Badge`, `ContactPanel` (memuat `<h1>`, formulir, skrip), `Dropdown`, `Modal`, `TestimonialGrid` tidak dipakai. `rehype-slug` terkonfigurasi padahal tidak ada body Markdown yang dirender. Fallback `import.meta.env.SITE_URL` di robots/sitemap tidak pernah aktif. | Menghapus kode adalah pilihan pemilik. |
| B5 | `AGENTS.md` merujuk `.agents/skills/theme-data-separation/SKILL.md` dan skill daisyUI, tetapi `.agents/` ada di `.gitignore` (tidak ada di clone) dan daisyUI bukan dependensi. | Dokumen instruksi milik pemilik. |
| B6 | Judul default blok `note` berbahasa Inggris ("INFO", "WARNING") pada situs `lang="id"`. | Tidak tampil saat ini (semua note punya judul). |
| B7 | Nilai `ulid` buatan tangan, memuat huruf yang tidak valid di Crockford base32 (`L`, `O`, `U`); hanya panjang yang divalidasi; field tidak dipakai kode mana pun. | Data inert. |
| B8 | UX/a11y: tiga `<h2>` kartu dukungan di hero beranda mendahului `<h2>` seksi. | Sebagian ditangani: `prefers-reduced-motion` (commit `8baf100`), skip link (commit sebelumnya), dan navigasi mobile sekarang terlihat (commit `e259f1f`). Hierarki heading hero tetap perlu penilaian semantik/visual. |
| B9 | JSON-LD artikel memakai SVG sebagai `image` bawaan. | **Sudah diperbaiki** pada commit `cbfb29c`: gunakan fallback raster untuk gambar artikel non-raster. CI lulus. |
| B10 | Artikel demo `contoh-css-props.md` (`draft: true`, id 99) berada di direktori konten produksi; kelas Tailwind di dalamnya ikut masuk CSS hasil build. | Draft tersaring di semua titik; dampak hanya ukuran CSS. |
| B11 | Tidak ada header keamanan (`vercel.json`). Koleksi `pages` mengabaikan `draft`. | **Ditangani sebagian besar:** header keamanan ditambahkan pada commit `cc99b2f`; rute statis home, articles, services, kontak, dan 404 kini menggagalkan build bila entri page ditandai `draft` (commit `ed0a397`, `8b003bd`, `e7859d0`, `ac3ebeb`, `66224b6`). Semua CI terkait lulus. Verifikasi header HTTP aktual tetap menunggu deployment produksi. |

## C. Dependensi (`npm audit`)

`npm audit`: 1 critical (astro), 1 high (sharp), 1 low (esbuild). Versi terpasang `astro 5.18.2` adalah rilis terakhir seri 5; rentang rentan mencakup seluruh `<=7.2.7`, perbaikan hanya di `7.3.8` (major).

Keterjangkauan pada repo ini, berdasarkan inspeksi kode:
- `define:vars`, `transition:*`/`ClientRouter`, `server:defer`, dan island `client:*`: 0 pemakaian.
- Output `static`, tanpa adapter: advisory SSR (SSRF header Host, bypass `base`, XSS refleksi) tidak berlaku saat runtime.
- `astro:assets`/`<Image>`: 0 pemakaian (satu-satunya kecocokan adalah komentar dokumentasi), sehingga jalur `sharp`/AVIF tidak dipakai.
- Satu-satunya spread props, `BlockRenderer.astro`, hanya menerima kunci yang sudah lolos skema Zod.

Kesimpulan: tidak ada eksploitasi yang dapat dijangkau pada konfigurasi saat ini. Migrasi ke Astro 7 adalah pekerjaan terpisah dan **sengaja tidak dilakukan di branch ini**. `esbuild` (baca file arbitrer di dev server **Windows**) hanya relevan bila `npm run dev` dijalankan di Windows.

## D. Belum diverifikasi

- **Situs produksi** (`konsultan-slf.vercel.app`): tidak dapat diakses dari lingkungan audit. Canonical/sitemap produksi, status HTTP, dan variabel lingkungan Vercel belum diperiksa; A7 ada untuk menutup celah ini.
- Rendering browser, responsif, navigasi keyboard, dan perilaku daftar isi sticky.
- Akurasi materi SLF/PBG terhadap regulasi.
