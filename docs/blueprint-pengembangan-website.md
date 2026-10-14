# Blueprint Pengembangan Website Konsultan SLF

- **Repository:** `skyforgged/konsultan-slf`
- **Tanggal:** 15 Oktober 2026
- **Status:** Dokumen perencanaan berdasarkan audit baca repository dan riset kompetitor
- **Dokumen terkait:** [Riset Kompetitor dan Peta Layanan SLF](./riset-kompetitor-layanan-slf.md)

## 1. Tujuan proyek

Membangun website konsultan SLF/PBG yang berfungsi sebagai:

1. Sumber informasi yang akurat mengenai layanan, persyaratan, proses, dan dokumen teknis bangunan.
2. Halaman pemasaran yang menjelaskan masalah klien dan solusi yang tersedia tanpa klaim yang tidak dapat dibuktikan.
3. Kanal untuk menghasilkan konsultasi yang relevan dan mengumpulkan informasi awal calon klien.
4. Pusat konten yang dapat dikembangkan melalui sistem content collection Astro.
5. Representasi perusahaan yang membangun kepercayaan melalui kompetensi, legalitas, proses kerja, dan portofolio yang dapat diverifikasi.

Prinsip utama: **jelas bagi calon klien, terstruktur untuk mesin pencari, mudah dikelola, dan dapat dibuktikan secara teknis maupun bisnis.**

## 2. Audit awal repository

Audit ini dilakukan dengan membaca berkas di branch default GitHub. Ini bukan pengujian build lokal atau pemeriksaan visual browser.

### 2.1 Kondisi yang terkonfirmasi

| Area | Kondisi saat audit | Implikasi |
|---|---|---|
| Framework | Astro 5 dengan TypeScript dan Tailwind CSS melalui Vite | Pertahankan stack saat ini; tidak ada alasan untuk migrasi framework |
| Build script | `astro check && astro build` | Jalankan pemeriksaan ini setelah perubahan kode |
| Content collections | Collection `articles`, `pages`, dan `services` didefinisikan di `src/content.config.ts` | Gunakan content collection yang ada, jangan membuat sistem konten kedua |
| Konten layanan | Folder layanan memiliki satu berkas yang terdaftar: `sertifikat-laik-fungsi.md` | Perlu menambah layanan secara terencana, bukan hanya memperluas satu halaman |
| Artikel | Folder artikel memiliki `pengertian-slf.md` | Konten edukasi masih perlu diperluas setelah halaman layanan siap |
| Halaman CMS-like | Collection `pages` memiliki `home.md` | Periksa apakah data ini benar-benar digunakan sebelum mengubah cara rendering |
| Halaman layanan | `src/pages/services/index.astro` dan `src/pages/services/[slug].astro` tersedia | Pola listing dan detail layanan sudah ada |
| Halaman artikel | `src/pages/articles/index.astro` dan `src/pages/articles/[slug].astro` tersedia | Pola listing dan detail artikel sudah ada |
| Beranda | `src/pages/index.astro` memiliki navigasi dan markup halaman yang ditulis langsung di berkas | Jadikan navigasi sebagai komponen/config bersama saat merapikan situs; hindari duplikasi header |
| Layout | `src/layouts/BaseLayout.astro` menyediakan title, description, canonical, Open Graph, dan Twitter metadata | Pertahankan dan perluas dengan hati-hati |
| Sitemap | `src/pages/sitemap.xml.ts` menyertakan beranda, listing artikel/layanan, dan entri collection | Periksa URL final, status draft, dan canonical saat struktur URL difinalisasi |
| Robots | `src/pages/robots.txt.ts` merujuk ke sitemap | Pastikan domain produksi diatur melalui konfigurasi deployment |
| URL saat ini | Listing memakai `/services/` dan `/articles/`; detail mengikuti slug collection | Jangan mengganti URL secara massal sebelum memeriksa tautan internal dan merencanakan redirect |
| Konten terstruktur | Artikel menggunakan blok terstruktur di frontmatter dan renderer komponen | Gunakan pola komponen yang sudah ada; validasi schema sebelum menambah jenis blok baru |

### 2.2 Batasan audit

- Isi repository dibaca melalui GitHub; build dan test tidak dijalankan dalam audit ini.
- Belum dilakukan audit visual responsif, Core Web Vitals, analytics, Search Console, atau data konversi.
- Belum ada verifikasi bahwa semua informasi legalitas, tenaga ahli, pengalaman, harga, atau portofolio perusahaan siap dipublikasikan.
- Keberadaan komponen atau collection tidak otomatis berarti seluruh fitur sudah digunakan dengan benar pada halaman produksi.
- Riset kompetitor bersifat desk research; layanan yang dipublikasikan kompetitor bukan bukti bahwa perusahaan kita menyediakan layanan yang sama.

## 3. Keputusan arsitektur informasi

Sitemap yang diinginkan pemilik proyek menjadi dasar. Namun, setiap menu harus memiliki tujuan yang berbeda, dan tidak semua item harus dibuat menjadi halaman baru sekaligus.

### 3.1 Sitemap target

```text
Beranda

Tentang Kami
├── Profil Perusahaan
├── Kompetensi dan Tenaga Ahli
└── Legalitas Perusahaan

Layanan
├── Pengurusan SLF
├── SLF Bangunan Eksisting
├── Perpanjangan SLF
├── Pengurusan PBG
├── Pengkajian Teknis Bangunan
├── As-Built Drawing
└── Layanan Pendukung
    ├── Review Dokumen
    ├── Survei dan Pengukuran
    ├── DED dan Redrawing (jika tersedia)
    └── Pendampingan Tindak Lanjut Temuan (jika tersedia)

Persyaratan
├── Persyaratan SLF
├── Persyaratan PBG
├── Checklist Dokumen SLF
└── Proses Pengurusan

Jenis Bangunan
├── Gedung Perkantoran
├── Pabrik dan Gudang
├── Bangunan Komersial
└── Bangunan Lainnya

Portofolio
├── Studi Kasus
└── Dokumentasi Proyek

Artikel
├── SLF
├── PBG dan IMB
├── Dokumen Teknis
└── Perizinan Pendukung

Kontak
├── Formulir Konsultasi
└── Informasi Kontak
```

Hotel, fasilitas kesehatan, sekolah, dan tipe bangunan lain dapat ditambahkan setelah kompetensi, bukti pengalaman, dan kebutuhan kontennya dipastikan.

### 3.2 Rekomendasi URL

URL saat ini menggunakan bahasa Inggris (`/services/` dan `/articles/`). Ada dua pilihan: mempertahankan URL tersebut demi stabilitas atau migrasi ke URL berbahasa Indonesia. Rekomendasi awal adalah **jangan memigrasikan URL yang sudah ada sebelum inventaris tautan dan kebutuhan redirect diperiksa**.

Rancangan URL baru untuk dipertimbangkan:

| Halaman | URL target yang disarankan |
|---|---|
| Beranda | `/` |
| Tentang Kami | `/tentang-kami/` |
| Profil Perusahaan | `/tentang-kami/profil-perusahaan/` |
| Layanan | `/layanan/` |
| Pengurusan SLF | `/layanan/pengurusan-slf/` |
| SLF Bangunan Eksisting | `/layanan/slf-bangunan-eksisting/` |
| Perpanjangan SLF | `/layanan/perpanjangan-slf/` |
| Pengurusan PBG | `/layanan/pengurusan-pbg/` |
| Pengkajian Teknis | `/layanan/pengkajian-teknis-bangunan/` |
| As-Built Drawing | `/layanan/as-built-drawing/` |
| Persyaratan SLF | `/persyaratan/slf/` |
| Persyaratan PBG | `/persyaratan/pbg/` |
| Jenis Bangunan | `/jenis-bangunan/` |
| Artikel | `/artikel/` |
| Portofolio | `/portofolio/` |
| Kontak | `/kontak/` |

URL di atas adalah usulan arsitektur, bukan pernyataan bahwa rute-rute itu sudah tersedia. Implementasi harus dilakukan bersama pembaruan navigasi, sitemap, canonical, related links, dan redirect jika diperlukan.

## 4. Model konten dan batas implementasi

### 4.1 Gunakan collection yang sudah tersedia

- **services:** halaman layanan yang membutuhkan field khusus seperti lingkup, persyaratan, manfaat, proses, FAQ, dan CTA.
- **articles:** artikel edukasi, tanggal publikasi, kategori, tags, related content, dan blok konten terstruktur.
- **pages:** halaman umum seperti profil perusahaan, kompetensi, legalitas, persyaratan, dan informasi kontak jika model yang ada memenuhi kebutuhan.

Sebelum memperluas schema, periksa apakah field yang tersedia sudah cukup. Hindari menambah field yang tidak dipakai renderer atau membuat data yang sama tersimpan di beberapa tempat.

### 4.2 Pemisahan jenis konten

| Jenis | Fungsi | Contoh |
|---|---|---|
| Halaman layanan | Mengubah pengunjung menjadi calon klien | Pengurusan SLF |
| Halaman persyaratan | Menjawab kebutuhan persiapan dan dokumen | Checklist Dokumen SLF |
| Halaman jenis bangunan | Menjelaskan kebutuhan spesifik fungsi bangunan | Pabrik dan Gudang |
| Artikel | Menjawab pertanyaan informasional | Perbedaan SLF, PBG, dan IMB |
| Studi kasus | Membuktikan proses dan hasil pekerjaan | Kasus as-built drawing gedung eksisting |
| Halaman perusahaan | Menunjukkan identitas dan kompetensi | Profil, tenaga ahli, legalitas |

Jangan menggunakan satu halaman untuk menggabungkan semua maksud pencarian. Jangan pula memecah halaman hanya untuk mengulang teks dengan mengganti nama layanan atau jenis bangunan.

## 5. Prioritas halaman dan konten

### P0 — Fondasi dan layanan dengan niat komersial

1. Audit lengkap konten dan URL yang sudah ada.
2. Finalisasi daftar layanan yang benar-benar dapat ditangani.
3. Perbaiki navigasi utama dan konsistensi layout.
4. Halaman Pengurusan SLF.
5. Halaman SLF Bangunan Eksisting.
6. Halaman Perpanjangan SLF.
7. Halaman Pengurusan PBG.
8. Halaman Pengkajian Teknis Bangunan.
9. Halaman As-Built Drawing.
10. CTA konsultasi yang konsisten dan kontak yang benar.

**Kriteria selesai P0:** setiap halaman memiliki isi unik, cakupan pekerjaan, batasan, tahapan, data awal yang dibutuhkan, FAQ relevan, CTA, metadata, dan tautan internal. Tidak ada janji hasil atau durasi yang tidak dapat dijamin.

### P1 — Informasi yang membantu keputusan calon klien

1. Persyaratan SLF.
2. Persyaratan PBG.
3. Checklist Dokumen SLF.
4. Proses Pengurusan.
5. Profil Perusahaan.
6. Kompetensi dan Tenaga Ahli.
7. Legalitas Perusahaan.
8. Formulir Konsultasi.

**Kriteria selesai P1:** dokumen dan proses dijelaskan dengan catatan bahwa kebutuhan dapat berubah sesuai kondisi bangunan dan aturan yang berlaku. Klaim profil/kompetensi didukung bukti.

### P2 — Relevansi per tipe bangunan dan bukti pengalaman

1. Gedung Perkantoran.
2. Pabrik dan Gudang.
3. Bangunan Komersial.
4. Studi Kasus.
5. Dokumentasi Proyek.

**Kriteria selesai P2:** tiap halaman menjelaskan kebutuhan yang relevan untuk tipe bangunan tersebut dan mempunyai bukti/visual yang sah untuk digunakan. Jika bukti belum tersedia, jangan membuat portofolio fiktif.

### P3 — Perluasan artikel SEO

Kelompok artikel:

- **SLF:** pengertian, fungsi, kondisi yang membutuhkan evaluasi, perpanjangan, dan kasus bangunan eksisting.
- **PBG dan IMB:** perbedaan istilah, konteks transisi, serta pertanyaan yang sering diajukan.
- **Dokumen Teknis:** as-built drawing, pengkajian teknis, gambar arsitektur/struktur/MEP, dan laporan pengujian.
- **Perizinan Pendukung:** dokumen pendukung sesuai fungsi bangunan dan kasus, dengan sumber resmi.

Artikel regulasi harus diperiksa terhadap sumber pemerintah/peraturan resmi dan diberi tanggal pembaruan jika substansinya berubah.

## 6. Standar isi halaman layanan

Setiap halaman layanan perlu memakai struktur yang konsisten:

1. **Ringkasan:** layanan apa dan masalah apa yang dibantu.
2. **Kondisi yang relevan:** kapan calon klien sebaiknya berkonsultasi.
3. **Target pengguna:** pemilik, pengelola, pengembang, atau organisasi yang sesuai.
4. **Ruang lingkup:** pekerjaan yang termasuk dan tidak termasuk.
5. **Persiapan awal:** data/dokumen yang membantu evaluasi.
6. **Tahapan kerja:** konsultasi, review, survei bila diperlukan, analisis, laporan, tindak lanjut.
7. **Hasil kerja:** dokumen atau deliverable yang benar-benar akan diserahkan.
8. **Faktor biaya dan waktu:** luas, lokasi, kompleksitas, kelengkapan dokumen, pengujian, revisi, dan ketergantungan eksternal.
9. **FAQ:** pertanyaan spesifik untuk layanan itu.
10. **Tautan terkait:** persyaratan, artikel, layanan yang berhubungan, dan studi kasus jika tersedia.
11. **CTA:** konsultasi atau permintaan evaluasi awal.

Tidak semua layanan selalu membutuhkan semua jenis pemeriksaan. Lingkup akhir harus disesuaikan dengan kondisi bangunan, aturan berlaku, dan kesepakatan kerja.

## 7. Formulir konsultasi dan alur prospek

### 7.1 Data awal yang disarankan

- Nama dan perusahaan/organisasi.
- Nomor WhatsApp atau telepon.
- Email jika diperlukan untuk tindak lanjut.
- Kota/kabupaten lokasi bangunan.
- Jenis bangunan.
- Perkiraan luas dan jumlah lantai.
- Status PBG/IMB: ada, tidak ada, atau belum diketahui.
- Status SLF: belum ada, masih berlaku, perlu perpanjangan, atau belum diketahui.
- Ketersediaan gambar teknis/as-built.
- Kebutuhan utama.
- Deskripsi singkat masalah.
- Lampiran foto/dokumen bersifat opsional, bukan wajib di kontak awal.

### 7.2 Perilaku yang diharapkan

- Validasi field wajib dan tampilkan pesan kesalahan yang jelas.
- Beri konfirmasi hanya setelah pengiriman benar-benar berhasil.
- Sediakan alternatif kontak yang valid.
- Jangan menyatakan formulir terkirim bila backend/form service belum tersedia.
- Tambahkan pemberitahuan privasi dan kumpulkan data seperlunya.
- Jangan meminta dokumen sensitif sebelum tersedia cara pengiriman yang sesuai.

**Catatan implementasi:** keberadaan tampilan formulir tidak berarti data telah terkirim. Sebelum publikasi, tetapkan tujuan pengiriman, backend/provider, proteksi spam, penanganan kegagalan, dan siapa yang menerima prospek.

## 8. Navigasi, desain, dan komponen

1. Buat satu sumber konfigurasi navigasi utama agar beranda dan halaman lain tidak memiliki menu berbeda.
2. Gunakan komponen header, footer, breadcrumb, CTA, FAQ, dan related content secara konsisten.
3. Pastikan navigasi mobile dapat digunakan dengan keyboard dan pembaca layar.
4. Pertahankan bahasa antarmuka Indonesia yang konsisten.
5. Gunakan desain responsif, hierarki heading yang benar, kontras memadai, alt text deskriptif, dan status fokus yang terlihat.
6. Hindari ikon/ilustrasi dekoratif yang menggantikan informasi penting.
7. Gunakan foto proyek nyata hanya dengan izin; gambar stok harus diperlakukan sebagai ilustrasi, bukan dokumentasi proyek.
8. Hindari membuat banyak komponen generik sebelum ada pola nyata yang berulang.

## 9. SEO teknis dan kualitas

### Wajib diperiksa pada setiap rilis

- Title dan meta description unik serta sesuai isi.
- Canonical URL sesuai domain dan URL final.
- Sitemap hanya memuat halaman publik yang valid dan bukan draft.
- Navigasi dan tautan internal tidak rusak.
- Status HTTP sesuai, termasuk halaman 404.
- Heading memiliki hierarki yang logis.
- Gambar memiliki ukuran wajar, alt text yang sesuai, dan tidak memperlambat halaman secara berlebihan.
- Halaman dapat digunakan pada mobile.
- Schema terstruktur hanya dipasang jika data memenuhi syarat dan sesuai jenis halaman.
- URL lama yang berubah mendapat redirect permanen yang tepat.
- Domain produksi ditetapkan melalui environment/config deployment, bukan hostname lokal.
- Tidak ada konten placeholder, link contoh, atau klaim yang belum disetujui.

Jangan menjanjikan peringkat Google. Keberhasilan SEO harus dinilai melalui data Search Console/analytics setelah terpasang dan mempunyai cukup data.

## 10. Tata kelola fakta dan kepatuhan

Sebelum publikasi, bedakan dengan jelas:

- Pekerjaan konsultan dan keputusan/penerbitan yang merupakan kewenangan instansi.
- Lingkup tenaga internal dan lingkup mitra.
- Pemeriksaan yang dilakukan dan pemeriksaan tambahan yang mungkin diperlukan.
- Informasi umum dan kesimpulan yang memerlukan evaluasi bangunan tertentu.
- Dokumen yang selalu diperlukan menurut kasus tertentu dan dokumen yang hanya mungkin diperlukan.
- Portofolio yang benar-benar dikerjakan dan contoh ilustrasi.

Dilarang menggunakan tanpa bukti:
- Jaminan sertifikat pasti terbit atau “100% lolos”.
- Klaim jumlah proyek, pengalaman, lisensi, akreditasi, atau tenaga ahli.
- Harga dan durasi pasti tanpa asumsi dan pengecualian.
- Foto, laporan, atau identitas klien tanpa izin.

Konten peraturan perlu merujuk sumber resmi yang relevan dan ditinjau ulang secara berkala.

## 11. Strategi pengembangan dan validasi

Pekerjaan dibagi menjadi perubahan kecil yang dapat diperiksa, bukan satu perubahan besar.

### Siklus kerja

1. Baca file yang terkait dengan perubahan.
2. Tetapkan tujuan dan kriteria penerimaan.
3. Lakukan perubahan terkecil yang menyelesaikan tujuan.
4. Jalankan `npm run build` atau pemeriksaan yang relevan.
5. Perbaiki seluruh error sebelum melanjutkan.
6. Periksa diff dan tautan/URL yang terdampak.
7. Commit dengan pesan yang spesifik.
8. Periksa status CI dan deployment.
9. Verifikasi halaman yang berubah jika tersedia lingkungan preview.
10. Dokumentasikan status nyata: lolos, gagal, atau belum dapat diuji.

### Kriteria rilis minimum

- Build `astro check && astro build` berhasil.
- Tidak ada kesalahan schema content collection.
- Tidak ada rute atau tautan internal penting yang hilang.
- Sitemap dan canonical konsisten dengan URL publik.
- Halaman layanan dan artikel tidak menampilkan draft.
- Formulir dan CTA tidak memberikan konfirmasi palsu.
- Status deployment diperiksa; status commit saja tidak menggantikan pengujian visual.

## 12. Daftar tugas yang dapat dieksekusi

| ID | Tugas | Prioritas | Ketergantungan | Kriteria penerimaan |
|---|---|---|---|---|
| A01 | Inventaris seluruh konten, URL, dan tautan yang ada | P0 | Tidak ada | Daftar rute dan slug lama terdokumentasi |
| A02 | Validasi daftar layanan nyata bersama pemilik proyek | P0 | Konfirmasi internal | Setiap layanan publik punya penanggung jawab/kompetensi |
| A03 | Finalisasi navigasi dan strategi URL | P0 | A01 | Tidak ada perubahan URL tanpa keputusan redirect |
| A04 | Audit header/footer dan jadikan konsisten | P0 | A03 | Menu sama di semua layout dan responsif |
| A05 | Perbaiki halaman Pengurusan SLF | P0 | A02 | Isi lengkap, CTA dan metadata valid |
| A06 | Tambahkan SLF Bangunan Eksisting | P0 | A02 | Halaman unik, lingkup dan batasan jelas |
| A07 | Tambahkan Perpanjangan SLF | P0 | A02 | Halaman berbeda dari SLF baru |
| A08 | Tambahkan Pengurusan PBG | P0 | A02 | Isi tidak menjanjikan penerbitan |
| A09 | Tambahkan Pengkajian Teknis | P0 | A02 | Lingkup pemeriksaan dan hasil kerja jelas |
| A10 | Tambahkan As-Built Drawing | P0 | A02 | Input, proses, hasil, dan pengecualian jelas |
| A11 | Audit sitemap, canonical, dan metadata | P1 | A03 | URL final dan sitemap konsisten |
| A12 | Bangun halaman persyaratan dan checklist | P1 | Review sumber resmi | Catatan variasi kebutuhan dan sumber disertakan |
| A13 | Siapkan profil, kompetensi, dan legalitas | P1 | Data perusahaan | Tidak ada klaim tanpa bukti |
| A14 | Tetapkan layanan penerimaan formulir konsultasi | P1 | Keputusan kanal kontak | Tes sukses/gagal dan antispam dilakukan |
| A15 | Bangun halaman jenis bangunan | P2 | Kompetensi dan data kasus | Konten spesifik, tidak duplikatif |
| A16 | Bangun template studi kasus | P2 | Proyek yang boleh dipublikasikan | Izin dan bukti publikasi tersedia |
| A17 | Perluas artikel edukasi | P3 | Struktur layanan stabil | Setiap artikel punya intent, sumber, dan tautan internal |
| A18 | Evaluasi data SEO dan prospek | P3 | Analytics/Search Console | Evaluasi berdasarkan data nyata |

## 13. Hal yang harus dikonfirmasi sebelum implementasi tertentu

Tidak perlu menunda pekerjaan teknis yang aman, tetapi hal berikut tidak boleh diasumsikan:

1. Nama resmi perusahaan, wilayah layanan, alamat, dan kanal kontak yang akan dipublikasikan.
2. Kompetensi dan tenaga ahli yang benar-benar tersedia.
3. Layanan mana yang dikerjakan internal dan mana yang melalui mitra.
4. Bukti/legalitas perusahaan yang boleh ditampilkan.
5. Studi kasus/foto proyek yang mempunyai izin publikasi.
6. Pilihan mempertahankan URL `/services/` dan `/articles/` atau migrasi dengan redirect.
7. Tujuan pengiriman formulir: email, CRM, WhatsApp, atau backend lain.
8. Domain produksi final dan environment deployment.

## 14. Keputusan awal

Berdasarkan audit dan riset kompetitor, keputusan kerja awal adalah:

- Tetap menggunakan Astro dan content collections yang ada.
- Jangan mengganti framework atau merombak schema tanpa kebutuhan terukur.
- Prioritaskan halaman layanan komersial sebelum menambah banyak artikel.
- Jadikan SLF baru, SLF eksisting, perpanjangan, PBG, pengkajian teknis, dan as-built drawing sebagai kelompok halaman prioritas—dengan syarat layanan tersebut benar-benar tersedia.
- Pertahankan URL yang ada sampai audit rute selesai.
- Pisahkan fakta perusahaan dari konten edukasi dan klaim pemasaran.
- Validasi setiap perubahan dengan build dan pemeriksaan deployment; jangan menganggap commit sebagai bukti bahwa website sudah berfungsi.
- Gunakan dokumen ini sebagai backlog utama dan perbarui status tugas ketika implementasi nyata dilakukan.

## 15. Dokumen rujukan

- [Riset Kompetitor dan Peta Layanan SLF](./riset-kompetitor-layanan-slf.md)
- [README repository](../README.md)
- [Schema content collections](../src/content.config.ts)
- [Beranda](../src/pages/index.astro)
- [Halaman daftar layanan](../src/pages/services/index.astro)
- [Template halaman layanan](../src/pages/services/%5Bslug%5D.astro)
- [Halaman daftar artikel](../src/pages/articles/index.astro)
- [Template halaman artikel](../src/pages/articles/%5Bslug%5D.astro)
- [Layout utama dan metadata](../src/layouts/BaseLayout.astro)
- [Sitemap XML](../src/pages/sitemap.xml.ts)
- [Robots.txt](../src/pages/robots.txt.ts)

---

**Status dokumen:** blueprint dan backlog awal sudah disusun. Ini bukan klaim bahwa seluruh tugas implementasi telah dilakukan atau bahwa build/deployment telah diuji.
