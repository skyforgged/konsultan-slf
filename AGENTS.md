# AGENTS.md

Panduan wajib untuk agen/AI yang bekerja di repo ini.

## Ringkasan proyek

- Situs statis **Astro 5** untuk konsultan SLF & PBG (bahasa Indonesia).
- Konten berada di `src/content/` (Markdown + schema Zod), hasil build di `dist/` (gitignored).
- Styling: Tailwind v4. Skill daisyUI tersedia di `.agents/skills/daisyui/`.

## Perintah

- `npm run build` — `astro check` + `astro build` + pemeriksaan tautan internal, SEO output, dan konten terpublikasi. **Wajib lulus sebelum tugas dianggap selesai.**
- `npm run dev` — server pengembangan.
- `npm run preview` — pratinjau hasil build.
- Gunakan **npm** (ada `package-lock.json`); jangan ganti ke pnpm/yarn.

## Aturan wajib untuk update content

Sebelum membuat atau memperbarui konten, baca dan patuhi:
- `docs/content-update-policy.md` — mandat editorial, batas topik, kriteria pemilihan, verifikasi fakta, dan batas perubahan.
- `docs/content-update-workflow.md` — urutan kerja, validasi, dan format laporan.

Aturan praktis:
- Agent boleh memilih sendiri artikel yang perlu diperbarui dan mengembangkan subtopik baru selama relevan dengan SLF/PBG. Tidak perlu menunggu daftar topik per artikel.
- Utamakan akurasi hukum, kebutuhan pembaca, kelengkapan, kegunaan praktis, tautan sumber, dan kualitas editorial. Jangan mengedit hanya demi menghasilkan commit.
- Topik di luar cakupan situs dilarang. Jangan menyisipkan topik seperti sepak bola dalam artikel PBG tanpa hubungan substantif.
- Untuk klaim hukum/teknis penting, periksa sumber primer resmi. Jangan mengarang ketentuan, biaya, durasi, statistik, atau sumber.
- Satu run berfokus pada satu target utama. File tambahan harus relevan dan alasannya dicatat.
- Pertahankan slug, ID/ULID, relasi artikel-layanan, URL, struktur data, dan aset spesifik halaman kecuali ada alasan teknis nyata.
- Jangan membuat artikel baru dalam run update-only; catat ide artikel baru sebagai usulan terpisah.
- Perbarui `updatedDate` hanya jika konten yang dipublikasikan benar-benar berubah. Jangan mengubah `pubDate` untuk membuat artikel tampak baru.
- Jika tidak ada perubahan substantif yang diperlukan, laporkan hasil audit tanpa memaksakan edit atau commit.
- Workflow AI tidak boleh langsung mempublikasikan konten ke `main` tanpa pemeriksaan. Perubahan konten harus divalidasi dan diajukan untuk peninjauan sesuai workflow yang digunakan.

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

1. Tambah atau ubah entri frontmatter di `src/content/pages/` sesuai schema di `src/content.config.ts`.
2. Tulis halaman `.astro` seminimal mungkin: ambil data dengan `getEntry('pages', '<slug>')`, lalu render theme dengan prop tersebut.
3. Jangan menaruh teks di file halaman — pindahkan ke frontmatter.
4. Jalankan `npm run build` dan pastikan semua validasi lulus.

## SEO

- `scripts/check-seo-output.mjs` memeriksa output `dist`: `<title>` tunggal, meta description, `og:*`, `twitter:*`, canonical (kecuali `noindex`), JSON-LD valid, `robots.txt`, dan `sitemap.xml`.
- Judul/deskripsi setiap halaman berasal dari frontmatter. Halaman baru tanpa entri frontmatter akan gagal validasi.

## Aturan pubDate / updatedDate

Setiap article (`src/content/articles/*.md`) dan service (`src/content/services/*.md`) harus memiliki:
- `pubDate` — tanggal publikasi asli, format ISO 8601.
- `updatedDate` — tanggal perubahan konten terakhir yang benar-benar terjadi, format ISO 8601.

Aturan:
1. Jangan gunakan `T00:00:00Z`; gunakan waktu ISO 8601 yang valid dan konsisten dengan konvensi repo.
2. Jangan ubah `pubDate` saat memperbarui konten lama.
3. `updatedDate` harus mencerminkan perubahan konten yang sebenarnya, bukan build rutin atau perubahan metadata yang tidak relevan.
4. Beberapa halaman yang memang diperbarui dalam satu pekerjaan boleh memiliki timestamp yang sama. Jangan memaksakan timestamp unik jika perubahan terjadi pada waktu yang sama.
5. File artikel harus berekstensi `.md`.
6. `ulid` harus tepat 26 karakter.
7. `relatedArticles` hanya boleh merujuk ID artikel yang benar-benar ada dan bukan draft.

Validasi otomatis dijalankan melalui `npm run build`. Jangan mengklaim pemeriksaan lulus jika belum dijalankan.

## Skill terkait

Baca `.agents/skills/theme-data-separation/SKILL.md` sebelum mengubah halaman, layout, komponen, atau konten yang melibatkan pemisahan theme/data.
