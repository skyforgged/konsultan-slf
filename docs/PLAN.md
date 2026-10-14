# Plan Implementasi Website Konsultan Perizinan SLF/PBG

**Repository:** `arisciwek/jasa-perijinan-slf`  
**Branch:** `docs/corporate-seo-implementation-plan`  
**Status dokumen:** Rencana kerja awal untuk ditinjau sebelum implementasi  
**Prinsip:** Audit dahulu, pertahankan hal yang sudah baik, lakukan perubahan terukur, dan jangan mengubah branch utama.

## 1. Tujuan

Membangun situs corporate untuk konsultan perizinan bangunan di Indonesia yang:

- Menjelaskan layanan secara jelas bagi calon klien.
- Mendukung akuisisi prospek melalui CTA dan kontak yang mudah ditemukan.
- Memiliki struktur konten yang mendukung SEO jangka panjang.
- Memisahkan data konten dari template agar artikel dan halaman dapat dipelihara melalui Markdown/frontmatter.
- Memakai komponen Astro yang dapat digunakan kembali, dengan kontrak data yang konsisten.
- Mudah dikembangkan tanpa membuat halaman depan dan halaman indeks menjadi konten statis yang tidak pernah menampilkan artikel terbaru.

Dokumen ini merupakan rencana, bukan klaim bahwa semua fitur sudah diterapkan. Detail implementasi harus disesuaikan setelah audit kondisi repository.

## 2. Prinsip Arsitektur

### 2.1 Konten sebagai sumber data

Gunakan Markdown dan frontmatter untuk konten editorial, halaman layanan, dan halaman informasional yang sesuai. Template Astro bertugas merender data, bukan menyimpan isi artikel panjang secara langsung.

Setiap komponen konten berada dalam file tersendiri jika komponen tersebut memang mempunyai tanggung jawab visual atau data yang terpisah. Jangan memaksakan satu komponen besar untuk semua pola konten.

### 2.2 Kontrak komponen yang konsisten

Tetapkan satu format data untuk daftar blok konten. Contoh konseptual:

```yaml
blocks:
  - component: callout
    title: Dokumen perlu diverifikasi
    body: Persyaratan dapat berbeda sesuai kondisi bangunan.
```

Nama field final harus ditetapkan setelah memeriksa pola frontmatter yang sudah ada. Hindari mendukung beberapa bentuk konfigurasi yang fungsinya sama tanpa alasan yang kuat.

### 2.3 Validasi skema

- Definisikan skema frontmatter menggunakan mekanisme content collection Astro yang sesuai dengan versi proyek.
- Validasi nama komponen dan properti setiap blok.
- Hubungan artikel terkait harus menunjuk ke slug/ID konten yang benar.
- Data yang tidak valid harus menghasilkan kesalahan build yang informatif, bukan gagal diam-diam atau menampilkan komponen kosong.

### 2.4 Komponen tetap terpisah

Pisahkan komponen berdasarkan tanggung jawab, misalnya:

- Layout halaman dan layout artikel.
- Komponen blok editorial.
- Komponen kartu dan navigasi konten.
- Komponen CTA dan kontak.
- Komponen SEO/metadata dan utilitas.

Jangan menambah abstraksi sebelum ada kebutuhan nyata. Utamakan komponen yang konsisten dan mudah dipahami.

## 3. Model Konten yang Diusulkan

Nama direktori dan skema final harus mengikuti hasil audit repository, tetapi secara konseptual konten dapat dibagi menjadi:

- **Pages:** beranda, tentang, proses kerja, kontak, FAQ umum.
- **Services:** halaman utama setiap layanan.
- **Articles:** artikel edukasi dan panduan.
- **Categories/topics:** pengelompokan artikel untuk navigasi dan internal linking.
- **Authors/reviewers:** metadata penulis atau peninjau bila memang digunakan.
- **Global configuration:** nama usaha, alamat, nomor kontak, CTA, social profile, dan metadata situs.

Frontmatter artikel setidaknya perlu dievaluasi untuk field berikut:

- `title`, `description`, `slug` atau ID konten.
- `publishedAt`, `updatedAt`, dan status publikasi jika dibutuhkan.
- `category` atau topik.
- `author`/reviewer bila relevan.
- `heroImage` atau gambar utama jika digunakan.
- `relatedArticles` untuk artikel yang memang terkait.
- `blocks` untuk komponen editorial yang dirender oleh template.
- Metadata SEO hanya jika dibutuhkan di luar nilai yang dapat diturunkan dengan aman dari konten.

Jangan menyalin field yang sama di banyak tempat bila dapat diturunkan secara konsisten dari sumber utama.

## 4. Arsitektur Informasi Situs

Struktur awal yang perlu divalidasi terhadap kebutuhan bisnis:

1. **Beranda**
   - Pernyataan nilai layanan dan CTA utama.
   - Ringkasan layanan.
   - Gambaran proses pendampingan.
   - Bukti kredibilitas yang benar-benar dapat diverifikasi.
   - Artikel terbaru dan konten pilihan yang diperbarui dari koleksi konten.
   - FAQ ringkas dan CTA kontak.

2. **Layanan**
   - SLF (Sertifikat Laik Fungsi).
   - PBG (Persetujuan Bangunan Gedung).
   - Pendampingan atau konsultasi teknis terkait bangunan, hanya jika benar-benar ditawarkan.
   - Layanan terkait lainnya ditetapkan setelah konfirmasi ruang lingkup bisnis.

3. **Proses kerja**
   - Konsultasi awal dan pengumpulan informasi.
   - Penelaahan kondisi dan dokumen.
   - Identifikasi kebutuhan tindak lanjut.
   - Pendampingan proses sesuai ruang lingkup yang disepakati.
   - Penjelasan hasil, batasan, dan tanggung jawab para pihak.

4. **Tentang perusahaan**
   - Profil, ruang lingkup kerja, tim/kompetensi, dan area layanan berdasarkan fakta yang dapat diverifikasi.

5. **Artikel/pusat informasi**
   - Artikel edukasi, panduan dokumen, penjelasan proses, dan pertanyaan umum.
   - Kategori/topik yang membantu pengguna menemukan informasi, bukan kategori yang dibuat hanya untuk menambah URL.

6. **FAQ dan kontak**
   - Pertanyaan umum dengan jawaban yang tidak menjanjikan hasil yang berada di luar kendali konsultan.
   - Kanal kontak dan formulir prospek bila dibutuhkan.

URL final harus sederhana, konsisten, dan tidak mengubah URL yang sudah terindeks tanpa strategi redirect.

## 5. Komponen yang Perlu Dievaluasi

Daftar ini adalah kandidat untuk audit dan bukan instruksi untuk membuat seluruh komponen tanpa seleksi.

### 5.1 Layout dan navigasi

- Site header dan navigasi responsif.
- Footer dengan informasi perusahaan dan navigasi penting.
- Breadcrumb.
- Layout halaman umum.
- Layout artikel dengan kolom konten dan daftar isi bila sesuai.

### 5.2 Komponen halaman layanan

- Hero/intro layanan.
- Grid atau daftar layanan.
- Ringkasan manfaat dan ruang lingkup.
- Langkah proses bernomor.
- Daftar dokumen atau checklist dengan catatan bahwa kebutuhan dapat bervariasi.
- FAQ.
- CTA kontak.
- Artikel terkait layanan.

### 5.3 Komponen editorial

- Lead/introduction.
- Heading dan teks yang terpisah dengan baik.
- Callout/note/warning.
- Daftar langkah.
- Daftar dokumen.
- Tabel perbandingan bila tabel memang paling tepat.
- FAQ.
- Kartu artikel.
- Artikel terbaru.
- Artikel terkait.
- Glossary bila ada kebutuhan nyata.

Setiap jenis heading tetap menjadi elemen heading HTML semantik. Jangan menggunakan komponen dekoratif yang menghasilkan hierarki heading tidak valid.

### 5.4 Komponen yang memerlukan bukti

Statistik, testimoni, logo klien, sertifikasi, daftar proyek, dan klaim keberhasilan hanya ditampilkan bila perusahaan menyediakan data yang dapat dipertanggungjawabkan. Jangan membuat angka, testimoni, atau logo fiktif untuk mengisi desain.

## 6. Artikel Terbaru dan Artikel Terkait

Halaman indeks dan halaman layanan tidak boleh hanya berisi daftar yang diperbarui manual jika sumber konten sudah tersedia.

- **Artikel terbaru:** dihasilkan dari koleksi artikel, diurutkan berdasarkan tanggal publikasi yang tervalidasi.
- **Artikel terkait:** ditentukan oleh relasi eksplisit atau mekanisme topik yang konsisten. Jangan menganggap dua artikel berhubungan hanya karena judulnya mengandung kata yang sama.
- **Kartu artikel:** menggunakan satu komponen yang konsisten untuk judul, ringkasan, tanggal, kategori, dan gambar opsional.
- **Fallback:** bila artikel terkait belum tersedia, tampilkan fallback yang disengaja atau sembunyikan bagian tersebut; jangan membuat link rusak.
- **Tanggal pembaruan:** tampilkan hanya jika bermakna dan benar-benar dikelola.

## 7. Pengalaman Membaca Artikel Panjang

Audit dan perbaiki pengalaman membaca artikel, khususnya daftar isi dan sidebar:

- Daftar isi dibuat dari heading konten yang relevan.
- ID heading harus stabil dan unik.
- Link daftar isi menuju ID yang benar.
- Sidebar sticky harus diuji pada tinggi viewport berbeda.
- Periksa seluruh ancestor elemen sticky terhadap `overflow`, `transform`, containment, dan aturan layout yang dapat menghambat sticky positioning.
- Pastikan sidebar tidak tertutup header sticky dan tetap dapat diakses ketika kontennya lebih tinggi dari viewport.
- Pada layar kecil, gunakan pola yang lebih sesuai, misalnya daftar isi yang dapat dibuka/tutup.
- Uji navigasi keyboard, fokus, dan kontras.

Jangan menyatakan masalah sticky telah selesai hanya karena CSS telah ditambahkan; verifikasi perilakunya di browser dan pada breakpoint yang relevan.

## 8. SEO dan Metadata

### 8.1 On-page

- Satu judul utama yang jelas untuk setiap halaman.
- Title dan meta description unik serta relevan.
- URL/canonical konsisten.
- Open Graph metadata dan gambar sosial bila tersedia.
- Heading tersusun semantik.
- Internal link antara artikel, kategori, dan layanan.
- Alt text deskriptif untuk gambar bermakna; gambar dekoratif ditangani dengan tepat.
- Hindari pengulangan keyword yang tidak alami dan halaman tipis yang tidak membantu pengguna.

### 8.2 Technical SEO

- Sitemap XML hanya memuat URL kanonis yang layak diindeks.
- `robots.txt` sesuai dengan kebijakan indeksasi.
- Status HTTP dan halaman 404 benar.
- Redirect untuk perubahan URL bila diperlukan.
- Tidak ada canonical yang salah atau link internal menuju URL yang tidak ada.
- Structured data hanya sesuai konten nyata dan pedoman jenis schema yang digunakan.
- Uji performa, aksesibilitas, dan layout responsif.

### 8.3 Strategi konten

Kelompokkan artikel ke dalam topik yang mendukung layanan, misalnya pengertian dan fungsi, alur proses, persiapan dokumen, perbedaan istilah, kendala umum, serta tindak lanjut. Topik akhir ditentukan berdasarkan riset kata kunci, kebutuhan calon klien, dan validasi ahli.

## 9. Akurasi Informasi SLF/PBG

Informasi perizinan dan persyaratan teknis dapat bergantung pada jenis bangunan, kondisi aktual, lokasi, dokumen yang tersedia, serta ketentuan yang berlaku.

- Perlakukan checklist dokumen sebagai panduan awal, bukan daftar universal yang selalu berlaku.
- Bedakan penjelasan umum dari hasil pemeriksaan kasus tertentu.
- Jangan menjanjikan penerbitan izin, persetujuan, atau jangka waktu yang tidak dapat dijamin.
- Hindari mengklaim bahwa semua bangunan mengikuti alur atau persyaratan yang identik.
- Periksa regulasi dan sumber resmi terbaru sebelum menerbitkan informasi hukum/teknis.
- Catat tanggal peninjauan konten bila informasi mudah berubah.
- Pastikan klaim layanan, kompetensi, wilayah layanan, dan hasil kerja dikonfirmasi oleh pemilik bisnis.

## 10. Tahapan Implementasi

### Tahap 0 — Audit repository dan baseline

- Periksa framework dan versi Astro.
- Inventarisasi routes, layouts, komponen, content collections, frontmatter, konfigurasi build, dan dependensi.
- Identifikasi fitur yang sudah bekerja dan yang bermasalah.
- Catat baseline build, lint, test, serta perilaku halaman yang penting.
- Bandingkan pola yang sudah ada; jangan menyalin arsitektur dari repository lain secara membabi buta.

**Output:** audit singkat, daftar risiko, dan peta file yang perlu disentuh.

### Tahap 1 — Tetapkan kontrak data

- Tentukan skema untuk pages, services, dan articles.
- Tentukan bentuk tunggal untuk `blocks` dan properti `component`.
- Tentukan aturan ID/slug, tanggal, kategori, artikel terkait, dan gambar.
- Tambahkan validasi yang menghasilkan pesan kesalahan jelas.
- Migrasikan konten hanya setelah format final disepakati dan diuji pada sampel.

**Output:** skema yang tervalidasi dan contoh konten representatif.

### Tahap 2 — Bangun renderer dan komponen inti

- Implementasikan renderer blok yang aman dan mudah dipelihara.
- Buat komponen terpisah untuk pola konten yang benar-benar diperlukan.
- Standarkan spacing, tipografi, dan responsivitas.
- Pastikan blok yang tidak dikenal gagal dengan pesan yang jelas.
- Hindari duplikasi komponen dengan fungsi sama.

**Output:** komponen inti dan satu halaman uji yang menggunakan beberapa jenis blok.

### Tahap 3 — Halaman corporate dan relasi konten

- Implementasikan/rapikan beranda, daftar layanan, detail layanan, profil, proses, FAQ, dan kontak sesuai audit.
- Sambungkan kartu artikel terbaru ke koleksi artikel.
- Sambungkan artikel terkait melalui relasi yang tervalidasi.
- Pastikan setiap CTA mengarah ke kanal yang benar.
- Pastikan halaman indeks berubah ketika konten baru ditambahkan.

**Output:** alur utama calon klien dapat digunakan dan konten dinamis tampil benar.

### Tahap 4 — UX artikel panjang

- Perbaiki daftar isi dan sidebar sticky.
- Uji berbagai panjang artikel dan viewport.
- Uji mobile, keyboard, anchor heading, dan header sticky.
- Dokumentasikan hasil pengujian.

**Output:** halaman artikel mudah dinavigasi tanpa merusak layout.

### Tahap 5 — Konten layanan dan editorial SLF/PBG

- Validasi daftar layanan dengan pemilik bisnis.
- Buat halaman layanan utama dan FAQ berdasarkan informasi yang terverifikasi.
- Siapkan cluster artikel berdasarkan riset kebutuhan pengguna.
- Tinjau akurasi informasi dan batasan klaim.
- Tambahkan relasi artikel-layanan secara terarah.

**Output:** fondasi konten yang akurat dan relevan bagi calon klien.

### Tahap 6 — SEO dan kesiapan produksi

- Audit metadata, canonical, sitemap, robots, redirect, dan structured data.
- Periksa broken links, gambar, responsivitas, aksesibilitas, dan performa.
- Uji build bersih dan semua rute utama.
- Pastikan halaman yang belum siap tidak terindeks tanpa sengaja.

**Output:** checklist peluncuran yang lulus pemeriksaan.

### Tahap 7 — Pemeliharaan

- Tetapkan proses editorial untuk tanggal publikasi/pembaruan dan peninjauan informasi teknis.
- Pantau error, broken links, performa, dan hasil pencarian.
- Perbarui konten berdasarkan perubahan regulasi dan kebutuhan pengguna.
- Hindari membuat halaman baru hanya untuk mengejar jumlah URL.

## 11. Kriteria Penerimaan

Pekerjaan dianggap siap ditinjau jika:

- Build produksi berhasil.
- Skema konten menolak data yang tidak valid dengan pesan yang jelas.
- Semua komponen yang direferensikan tersedia dan properti datanya tervalidasi.
- Tidak ada relasi artikel atau link internal yang rusak.
- Halaman beranda/indeks menampilkan artikel terbaru dari sumber data.
- Artikel terkait mengarah ke konten yang benar.
- Heading, daftar isi, dan anchor bekerja konsisten.
- Sidebar sticky diuji pada desktop dan perilaku mobile masuk akal.
- Metadata, canonical, sitemap, dan robots sesuai strategi.
- Tidak ada statistik, testimoni, sertifikasi, atau klaim layanan yang dibuat-buat.
- Konten perizinan diberi batasan yang tepat dan telah ditinjau.
- Perubahan tidak merusak halaman dan pola yang sudah ada.

## 12. Di Luar Ruang Lingkup Awal

Tidak termasuk kecuali disetujui terpisah:

- Portal login klien.
- Integrasi langsung dengan sistem pemerintah.
- Kalkulator yang menjamin kelayakan atau persetujuan perizinan.
- Pembayaran online, CRM, atau otomasi tindak lanjut prospek.
- Migrasi massal seluruh konten sebelum skema dan sampel disetujui.
- Klaim legal/teknis tanpa sumber dan validasi.

## 13. Urutan Kerja Pertama Setelah Rencana Disetujui

1. Audit repository dan catat kondisi aktual.
2. Petakan komponen yang ada terhadap kebutuhan pada dokumen ini.
3. Usulkan kontrak frontmatter berdasarkan pola nyata di repository.
4. Implementasikan satu halaman layanan dan satu artikel panjang sebagai proof of concept.
5. Jalankan build dan pemeriksaan visual.
6. Minta review sebelum menerapkan pola ke konten lain.
7. Kerjakan sisanya dalam commit kecil di branch ini agar mudah ditinjau dan di-merge.

## 14. Catatan Perubahan

Dokumen ini hanya mendefinisikan rencana implementasi awal. Struktur folder, nama field, jumlah komponen, dan urutan teknis final harus mengikuti audit repository, versi framework, kondisi konten, serta kebutuhan bisnis yang telah dikonfirmasi.# PLAN
