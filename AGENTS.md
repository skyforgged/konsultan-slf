# AGENTS.md

Panduan untuk agen/AI yang bekerja di repo ini.

## Ringkasan proyek

- Situs statis **Astro 5** untuk konsultan SLF & PBG (bahasa Indonesia).
- Konten berada di `src/content/` (markdown + schema Zod), hasil build di `dist/` (gitignored).
- Styling: Tailwind v4. Skill daisyUI tersedia di `.agents/skills/daisyui/`.

## Perintah

- `npm run build` — `astro check` + `astro build` + `check-internal-links.mjs` + `check-seo-output.mjs`. **Wajib lulus sebelum tugas dianggap selesai.**
- `npm run dev` — server pengembangan.
- `npm run preview` — pratinjau hasil build.
- Gunakan **npm** (ada `package-lock.json`); jangan ganti ke pnpm/yarn.

## ATURAN INTI: pisahkan "theme" dari "data"

Ini tujuan utama repo. Layout, komponen, dan blok adalah **theme**; frontmatter/content adalah **data**.

- **Theme** = layout, komponen, blok, styling, logika render. Hanya struktur, markup, class, dan menerima data lewat `Astro.props`. **Tidak boleh memuat data atau teks literal apa pun.**
- **Data** = semua teks yang terlihat pengguna maupun terbaca mesin: judul, deskripsi, heading, paragraf, label, teks tombol, menu navigasi, footer, nama/deskripsi JSON-LD, meta SEO, `alt` gambar, dll. **Semua harus berasal dari frontmatter atau content collection.**
- **Label UI bersama** (navigasi, footer, label mikro blok seperti "Prioritas", label form, tombol bersama) berasal dari `src/config/ui.ts`. Teks yang spesifik untuk satu halaman tetap di frontmatter `src/content/pages/*.md`.

Konsekuensi:

- Jangan menulis teks apa pun di dalam layout/komponen. Terima sebagai prop.
- Nilai "sekadar fallback"/default di dalam theme tetap dianggap pelanggaran; sediakan nilainya di data.
- Halaman statis `.astro` pun wajib mengambil data dari `src/content/pages/*.md` (bukan literal di file halaman).
- Mengganti teks = mengubah frontmatter, **bukan** mengubah layout/komponen.

Alasan: satu sumber kebenaran, audit mudah, ganti konten tanpa menyentuh theme, dan konsisten dengan SEO checker.

## Struktur

| Lokasi | Peran |
| --- | --- |
| `src/layouts/BaseLayout.astro` | theme head/meta (menerima `title`, `description`, `canonical`, `noindex`, `image`) |
| `src/layouts/ArticleLayout.astro` | theme halaman artikel |
| `src/components/shared/*`, `src/components/blocks/*` | theme blok konten (menerima props) |
| `src/components/blocks.ts` | pemetaan `component` → komponen |
| `src/content/pages/*.md` | data halaman statis (home, 404, articles index, services index) |
| `src/content/articles/*.md` | data artikel + `blocks` |
| `src/content/services/*.md` | data layanan |
| `src/content.config.ts` | schema frontmatter (sumber kebenaran bentuk data) |
| `src/config/site.ts` | data identitas situs (nama, WhatsApp, alamat) |
| `src/config/ui.ts` | label UI bersama (navigasi, footer, tombol, badge blok, label form) |
| `scripts/check-seo-output.mjs` | validasi SEO pada output `dist` |

## Menambah / mengubah halaman

1. Tambah atau ubah entri frontmatter di `src/content/pages/` (lihat schema di `src/content.config.ts`).
2. Tulis halaman `.astro` seminimal mungkin: ambil data dengan `getEntry('pages', '<slug>')`, lalu render theme dengan prop tersebut.
3. Jangan menaruh teks di file halaman — pindahkan ke frontmatter.
4. Jalankan `npm run build` dan pastikan semua validasi lulus.

## SEO

- `scripts/check-seo-output.mjs` memeriksa `dist`: `<title>` tunggal, meta description, `og:*`, `twitter:*`, canonical (kecuali `noindex`), JSON-LD valid, `robots.txt`, dan `sitemap.xml`.
- Judul/deskripsi setiap halaman berasal dari frontmatter. Halaman baru tanpa entri frontmatter akan gagal validasi.

## Aturan pubDate / updatedDate (faktual)

Setiap article (`src/content/articles/*.md`) dan service (`src/content/services/*.md`) **harus** memiliki:

- `pubDate` — tanggal penerbitan, format ISO 8601 (mis. `"2026-10-15T14:00:00Z"`).
- `updatedDate` — tanggal pembaruan terakhir, format ISO 8601.

Aturan keras:

1. **Jangan pernah gunakan `T00:00:00Z`.** Gunakan jam non-midnight (mis. `T08:00:00Z`, `T13:54:00Z`) agar `sort((a, b) => b.updatedDate - a.updatedDate)` di `ArticleListBlock.astro`, `PageUpdatedArticles.astro`, `related.ts`, dan `sitemap.xml.ts` bekerja dengan benar.
2. **Setiap article/service harus punya `updatedDate` faktual** — bukan nilai seragam. Setiap perubahan konten harus diikuti update `updatedDate` ke UTC saat itu juga.
3. **Jangan salin-nilai `updatedDate` dari article lain.** Setiap entry harus punya nilai unik sesuai waktu edit terakhirnya.
4. **File article harus berekstensi `.md`.** File tanpa ekstensi tidak dimuat oleh Astro content collection.
5. **`ulid` harus tepat 26 karakter.**
6. **`relatedArticles` hanya boleh merujuk ID article yang benar-benar ada** (dan tidak draft).

Validasi otomatis: `npm run build` menjalankan `check-published-content.mjs` yang memeriksa halaman terpublish. Untuk pengecekan manual, gunakan:

```bash
grep -E "^updatedDate:" src/content/articles/*.md | sort -t'"' -k2
```

## Skill terkait

- Baca `.agents/skills/theme-data-separation/SKILL.md` sebelum mengubah halaman, layout, komponen, atau konten.
