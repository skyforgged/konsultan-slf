# Konsultan SLF & PBG

Website informasi dan pendampingan Sertifikat Laik Fungsi (SLF) serta Persetujuan Bangunan Gedung (PBG), dibangun menggunakan Astro.

## Persyaratan

- Node.js versi 20 atau lebih baru
- npm

Periksa versi yang tersedia:

```bash
node --version
npm --version
```

## Menjalankan di komputer lokal

Clone repository dan masuk ke direktori proyek:

```bash
git clone https://github.com/skyforgged/konsultan-slf.git
cd konsultan-slf
npm install
npm run dev
```

Astro akan menampilkan alamat lokal, biasanya `http://localhost:4321`.

## Validasi dan build produksi lokal

Jalankan pemeriksaan tipe dan build:

```bash
npm run build
```

Script build menjalankan `astro check` sebelum `astro build`. Hasil situs statis dibuat di direktori `dist/`.

Untuk memeriksa hasil build:

```bash
test -f dist/index.html && echo "Beranda tersedia"
test -f dist/favicon.svg && echo "Favicon tersedia"
test -f dist/images/logo-konsultan-slf-pbg.svg && echo "Logo tersedia"
test -f dist/images/og-default.svg && echo "Gambar sosial tersedia"
```

Jalankan hasil build secara lokal:

```bash
npm run preview -- --host 0.0.0.0
```

Buka alamat yang ditampilkan terminal. Perintah preview menyajikan hasil build terakhir; jalankan ulang `npm run build` setelah mengubah kode atau konten.

## Konfigurasi URL situs

Atur `SITE_URL` ke URL publik kanonis saat membuat build untuk produksi. Contoh:

```bash
SITE_URL=https://domain-anda.example npm run build
```

Jika berjalan di Vercel, konfigurasi juga membaca `VERCEL_PROJECT_PRODUCTION_URL`. Tanpa konfigurasi URL produksi, nilai fallback adalah `http://konsultan-slf.lan`, yang hanya cocok untuk lingkungan lokal. Jangan gunakan URL fallback tersebut untuk rilis publik.

URL situs digunakan untuk canonical, Open Graph, data terstruktur, sitemap, dan robots.txt.

## Konten

Konten disimpan sebagai Markdown di:

- `src/content/articles/` — artikel dan panduan
- `src/content/services/` — halaman layanan
- `src/content/pages/` — konten halaman umum

Periksa skema di `src/content.config.ts` sebelum menambahkan atau mengubah field frontmatter.

## Catatan deployment

Build lokal yang berhasil memvalidasi kode dan menghasilkan situs, tetapi tidak membuktikan bahwa deployment hosting telah berhasil. Setelah build, periksa hasil `dist/` dan status deployment penyedia hosting secara terpisah.
