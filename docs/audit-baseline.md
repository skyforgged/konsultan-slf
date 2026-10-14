# Audit Baseline — Konsultan SLF/PBG

**Tanggal audit:** 2026-10-14  
**Branch audit/implementasi:** `feat/slf-content-architecture`  
**Sumber:** inspeksi struktur dan isi `main`; belum menjalankan build karena repository diakses melalui GitHub API, bukan checkout lokal.

## 1. Kondisi aktual

- Framework: Astro `^5.14.1`, TypeScript `^5.9.2`, Tailwind CSS v4 melalui plugin Vite.
- Script build: `astro check && astro build`; belum diverifikasi dengan eksekusi.
- Content collections: `articles`, `pages`, dan `services` didefinisikan di `src/content.config.ts`.
- Konten nyata yang tersedia hanya satu artikel (`pengertian-slf.md`) dan satu halaman contoh (`home.md`); belum ada direktori/konten `src/content/services`.
- Halaman yang ada: beranda, indeks artikel, dan rute detail artikel.
- Komponen editorial sudah mulai dipisahkan, tetapi `BlockRenderer.astro` menggunakan named slots dan belum merender komponen dari registry `src/components/blocks.ts`. Frontmatter `blocks` artikel belum dipakai oleh halaman artikel.
- Beranda masih hardcoded; daftar layanan tidak berasal dari collection `services`.
- Indeks artikel hanya berupa daftar tautan tanpa layout/metadata halaman.
- `ArticleLayout.astro` tidak menggunakan `BaseLayout.astro`, sehingga metadata SEO dan kerangka HTML standar tidak diterapkan pada artikel melalui layout bersama.
- Relasi artikel menggunakan `relatedType` dan `relatedId`; fungsi pemilihan artikel terkait tersedia, tetapi belum ada validasi referensi lintas collection.
- `public/robots.txt` berisi `Disallow: /`, yang mencegah crawling seluruh situs. Ini dapat dipertahankan hanya untuk lingkungan nonproduksi; wajib ditinjau sebelum peluncuran.
- `src/config/site.ts` memuat nomor WhatsApp contoh. Jangan gunakan sebagai kontak publik sebelum dikonfirmasi pemilik bisnis.
- Konten contoh artikel memuat Lorem ipsum, klaim waktu pengurusan yang tidak bersumber, serta bagian FAQ yang berulang antara frontmatter dan Markdown.

## 2. Risiko prioritas

| Prioritas | Temuan | Tindakan |
|---|---|---|
| P0 | Konten contoh berisi Lorem ipsum dan klaim waktu proses yang belum terverifikasi | Hapus konten placeholder dan hindari janji durasi |
| P0 sebelum produksi | `robots.txt` memblokir seluruh crawler | Tentukan kebijakan berdasarkan lingkungan; jangan deploy dengan aturan ini jika situs harus diindeks |
| P1 | Artikel tidak memakai layout SEO bersama | Satukan artikel dan indeks di `BaseLayout` |
| P1 | Kontrak `blocks` sudah divalidasi tetapi belum dirender | Gunakan registry komponen dan tampilkan error untuk komponen yang tidak dikenal |
| P1 | Collection layanan belum memiliki konten dan rute | Tambahkan proof of concept layanan SLF/PBG |
| P2 | Relasi lintas collection belum divalidasi | Tambahkan pemeriksaan build-time setelah model ID/slug final |
| P2 | Homepage dan daftar layanan hardcoded | Migrasikan setelah halaman layanan berbasis collection terbukti |

## 3. Keputusan teknis awal

1. Pertahankan Astro 5 dan Content Collections yang sudah ada.
2. Gunakan satu kontrak blok editorial: `blocks: [{ component, ...props }]`.
3. Pertahankan komponen per file; gunakan registry sebagai satu sumber pemetaan nama blok ke komponen.
4. Gunakan slug eksplisit sebagai URL publik; ID numerik dipakai untuk relasi internal hanya jika memang dibutuhkan.
5. Jangan membuat klaim bisnis, testimoni, statistik, nomor kontak, atau durasi layanan tanpa konfirmasi.
6. Kerjakan dalam branch terpisah dan commit kecil. Build dan pemeriksaan visual tetap menjadi gerbang sebelum merge.

## 4. Batas audit

Audit ini berbasis source yang tersimpan di GitHub. Build, browser rendering, keyboard navigation, responsive layout, broken-link scan, dan performa belum diuji secara langsung. Jangan menganggap kriteria tersebut lulus sampai diuji pada checkout proyek.
