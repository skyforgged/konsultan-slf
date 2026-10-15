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

## 5. Pembaruan audit — 2026-10-15

Bagian ini melengkapi catatan awal di atas; kondisi lama pada bagian 1–2 adalah baseline sebelum implementasi, bukan kondisi repository saat ini.

### Perubahan yang sudah masuk ke `main`

- Halaman artikel menggunakan layout bersama untuk metadata canonical, Open Graph, Twitter Card, dan WebPage JSON-LD.
- Halaman detail layanan dirender dari content collection; konten layanan yang tersedia mencakup SLF, PBG, bangunan eksisting, perpanjangan SLF, pengkajian teknis, dan as-built drawing.
- Sitemap XML mengambil URL dari koleksi artikel dan layanan, serta mengecualikan konten draft.
- `robots.txt` dinamis menautkan sitemap berdasarkan URL situs.
- Header/footer diberi identitas logo, dan halaman 404 bermerek sudah tersedia dengan `noindex, follow`.
- Schema Service, BreadcrumbList, FAQPage (bila FAQ terlihat), Organization, WebSite, WebPage, dan schema artikel sudah ditambahkan sesuai konteks halaman.
- CTA konsultasi tersedia pada template artikel dan mengarah ke daftar layanan; belum ada klaim bahwa formulir prospek sudah tersedia.

### Verifikasi otomatis

- GitHub Actions menjalankan `npm ci` dan `npm run build` (`astro check && astro build`).
- Run #78 pada commit `72eb5a459a3d690454c64267bc6f87eb632132a8` berstatus **success** pada 2026-10-14.
- Status tersebut membuktikan build pada commit itu lolos; tidak membuktikan perubahan commit setelahnya lolos build.
- Deployment Vercel pada commit yang sama gagal karena pembatasan jumlah deployment, bukan karena laporan build gagal. URL produksi setelah perubahan terbaru belum diverifikasi.

### Temuan yang masih perlu ditindaklanjuti

1. **Gambar sosial:** fallback saat ini masih SVG 1200×630. Dukungan SVG pada crawler sosial tidak seragam; sediakan fallback PNG/JPEG dan periksa semua nilai `og:image`/Twitter image setelah aset raster tersedia.
2. **Tautan internal:** belum ada hasil pemindaian menyeluruh atas semua tautan dan URL hasil render. Pemeriksaan source saja belum cukup untuk menyatakan tidak ada broken link.
3. **Konten dan relasi:** artikel yang tersedia masih sangat sedikit; relasi artikel terkait perlu diverifikasi berdasarkan ID/slug nyata dan relevansi editorial.
4. **Halaman persyaratan/checklist:** belum dianggap selesai tanpa rujukan sumber resmi yang sesuai dan tanggal peninjauan.
5. **Data perusahaan dan kontak:** jangan menambahkan alamat, wilayah layanan, kompetensi, kanal kontak, harga, testimoni, atau portofolio tanpa konfirmasi.
6. **Validasi produksi:** perlu pemeriksaan browser untuk tampilan responsif, akses keyboard, daftar isi sticky, status HTTP, canonical, sitemap, dan metadata URL publik.

### Status

- Build CI: **lulus** pada commit yang disebutkan di atas.
- Build pada commit yang lebih baru: **belum terverifikasi** sampai workflow terkait selesai.
- Deployment produksi terbaru: **belum terverifikasi** karena pembatasan deployment Vercel.
- Audit browser, tautan internal penuh, dan kompatibilitas crawler sosial: **belum selesai**.

## 6. Pembaruan implementasi — 2026-10-15

### Validasi build terbaru
- Pemilik proyek mengonfirmasi **Pull + Build OK**, dengan hasil **11 halaman dan 0 errors** pada commit `5084774`.
- Perubahan setelah commit tersebut belum tercakup oleh hasil build yang dikonfirmasi itu; CI perlu memvalidasi commit berikutnya.

### Perbaikan SEO 404
- `BaseLayout.astro` menerima prop `noindex`; saat aktif, layout mengeluarkan `robots=noindex, follow` dan tidak mencetak elemen canonical.
- Halaman `404.astro` menggunakan prop tersebut. Ini menghindari canonical pada halaman error yang memang tidak boleh diindeks.
- Verifikasi source melalui GitHub mengonfirmasi perubahan pada kedua file.
- Commit perubahan: `1ddcb96` (layout) dan `716ec65` (halaman 404).

### Pekerjaan terbuka
- Hasil build untuk commit `716ec65` masih perlu dikonfirmasi oleh GitHub Actions.
- Fallback gambar sosial raster PNG/JPEG dan pemindaian tautan internal menyeluruh masih belum selesai.
- Verifikasi browser dan URL produksi tetap tertunda karena belum ada hasil akses produksi yang terkonfirmasi.

## 7. Audit tautan internal — 2026-10-15

### Hasil pemeriksaan source
- Meninjau tautan pada halaman beranda, indeks artikel, indeks layanan, dan halaman 404, serta enam berkas layanan.
- Tautan navigasi utama yang ditemukan mengarah ke rute yang tersedia: `/`, `/articles/`, dan `/services/`; tautan berjangkar di beranda mengarah ke bagian halaman yang disediakan.
- Aset logo dan ilustrasi yang dirujuk secara eksplisit pada empat halaman tersebut menggunakan path lokal di bawah `/images/`; keberadaan file fisiknya belum dapat disimpulkan dari pemeriksaan atribut source saja.
- Halaman detail layanan memakai slug dari content collection, sehingga pemeriksaan tautan detail dan respons HTTP tetap memerlukan hasil build/render atau crawl situs yang berjalan.

### Batas dan tindak lanjut
- Ini adalah audit source terbatas, **bukan** hasil crawl lengkap dan bukan bukti bahwa seluruh tautan menghasilkan HTTP 200.
- Fallback Open Graph/Twitter masih menggunakan SVG. PNG/JPEG belum ditambahkan karena aset raster yang terverifikasi belum tersedia.
- Build CI pada commit dokumentasi baseline `5084774` tercatat sukses. Commit perbaikan 404 dan pembaruan audit sesudahnya masih perlu hasil CI tersendiri sebelum dinyatakan lulus.


## 8. Verifikasi SEO hasil build — 2026-10-15

### Pemeriksaan otomatis yang ditambahkan
- Build pipeline kini menjalankan `scripts/check-seo-output.mjs` setelah pemeriksaan tautan internal.
- Pemeriksaan mencakup jumlah dan keberadaan title, meta description, canonical, Open Graph, Twitter Card, validitas sintaks JSON-LD, keberadaan gambar sosial lokal, `robots.txt`, dan `sitemap.xml`.
- Pemeriksaan canonical secara khusus memastikan halaman `noindex` tidak memiliki canonical.

### Hasil CI
- Commit: `10a6d019311b6991f793bddf5b34ab4d63fa8f80` — `test(seo): validate generated SEO output`.
- GitHub Actions: **success** — [run #88](https://github.com/skyforgged/konsultan-slf/actions/runs/38629779024).
- Build menghasilkan **11 halaman**.
- Pemeriksaan tautan internal: **158 referensi lokal diperiksa, lulus**.
- Pemeriksaan SEO hasil render: **11 halaman**, **31 blok JSON-LD valid**, **10 gambar sosial lokal terverifikasi**, serta `robots.txt` dan `sitemap.xml` tersedia.

### Batas yang masih berlaku
- Gambar sosial default masih SVG; fallback PNG/JPEG tetap menjadi pekerjaan berikutnya agar kompatibilitas crawler sosial lebih luas.
- Pemeriksaan ini memvalidasi file hasil build statis, bukan status HTTP situs produksi atau hasil rendering semua browser.
- URL publik, deployment, responsive layout, keyboard navigation, dan perilaku daftar isi sticky belum dianggap terverifikasi.

## 9. Pembaruan audit SEO — 2026-10-15

### Pemeriksaan otomatis tambahan di repository

Pemeriksaan pada `scripts/check-seo-output.mjs` kini juga mencakup:

- URL canonical duplikat antarhalaman.
- Konsistensi origin dan URL sitemap dengan canonical halaman yang dapat diindeks.
- Deklarasi sitemap pada `robots.txt`: harus tepat satu, absolut HTTP(S), dan menunjuk ke `sitemap.xml`.
- Konsistensi `og:title` dan `twitter:title` dengan judul HTML.
- Konsistensi deskripsi Open Graph/Twitter dengan meta description.
- Konsistensi `twitter:image` dengan `og:image`.
- Validitas tanggal publikasi/pembaruan serta URL absolut pada data terstruktur artikel, layanan, dan breadcrumb.

Perubahan terakhir terkait pemeriksaan ini sudah masuk ke `main` pada commit `61b5840`. Pemeriksaan source memastikan aturan tersebut ada; hasilnya belum boleh dianggap lulus pada output build sampai pipeline berhasil dijalankan pada commit terbaru.

### Estimasi pekerjaan terbuka

Audit tersisa dipusatkan pada empat kelompok, bukan mengulang fondasi implementasi:

1. **Build dan integrasi berkelanjutan:** memperoleh hasil build sukses untuk commit terbaru. Status Vercel yang terakhir terlihat adalah `build-rate-limit`, bukan laporan kegagalan kode. Hasil build commit terbaru belum terkonfirmasi.
2. **Aset sosial:** menyediakan fallback raster PNG/JPEG yang valid dan menguji gambar sosial hasil render.
3. **Verifikasi browser:** menguji responsif, navigasi keyboard, daftar isi/anchor, dan sticky sidebar pada ukuran viewport relevan.
4. **Kesiapan produksi dan konten:** memverifikasi URL publik, status HTTP/crawl, tautan hasil render, serta akurasi materi SLF/PBG dengan sumber resmi dan peninjauan yang sesuai.

### Batas status

- **Sudah diimplementasikan:** pemeriksaan source dan validator SEO tambahan di pipeline.
- **Belum terkonfirmasi:** build untuk commit terbaru dan deployment publik terbaru.
- **Belum selesai:** pengujian browser dan pemeriksaan langsung situs produksi.
- **Tidak termasuk fakta yang boleh diasumsikan:** nomor kontak, klaim kompetensi, harga, testimoni, portofolio, atau janji waktu/hasil layanan tanpa bukti dan konfirmasi pemilik usaha.


## 10. Pembaruan audit — 2026-10-15 (lanjutan)

### Perbaikan dan verifikasi terbaru

- Fallback gambar sosial artikel diubah dari `/images/og-default.svg` menjadi `/images/og-default.png` agar fallback artikel menggunakan aset raster yang tersedia. Perubahan masuk ke `main` melalui PR #4, merge commit `8ee9ffdcf24fd2f681b103f08047797e74a36250`.
- Dua skrip debug sementara (`scripts/debug-seo.mjs` dan `scripts/debug-seo2.mjs`) dihapus melalui PR #5; validator resmi `scripts/check-seo-output.mjs` tetap menjadi bagian dari build.
- GitHub Actions untuk commit `2273d0706ee74795f317e0bc5725b68cfed05823` selesai dengan status **success**. Pemeriksaan Vercel untuk commit yang sama juga berstatus **success**.
- Validasi source menunjukkan `validateContentRelations()` dijalankan dari halaman beranda saat build, memeriksa ID/slug unik, ID blok duplikat, bentuk tabel, dan relasi artikel ke target yang dipublikasikan.

### Pemeriksaan yang belum dapat diklaim selesai

- Pemeriksaan langsung URL publik dari lingkungan audit tidak berhasil dilakukan; alat audit tidak dapat mengakses domain. Ini **bukan bukti bahwa situs sedang down** dan bukan pengganti pengujian dari browser pengguna.
- Responsive layout, keyboard navigation, perilaku daftar isi/sticky sidebar, status HTTP publik, dan rendering crawler sosial tetap memerlukan pemeriksaan browser/HTTP langsung.
- Materi SLF/PBG masih perlu ditinjau terhadap sumber resmi dan diberi tanggal peninjauan. Rujukan utama yang ditemukan: [PP Nomor 16 Tahun 2021 pada JDIH Kementerian Pekerjaan Umum](https://jdih.pu.go.id/detail-dokumen/PP-nomor-16-Tahun-2021-tahun-2021-Peraturan-Pelaksanaan-Undang-Undang-Nomor-28-Tahun-2002-Tentang-Bangunan-Gedung) dan [portal resmi SIMBG](https://simbg.pu.go.id/). Kebutuhan dokumen dan penerapan untuk bangunan tertentu tetap harus diverifikasi sesuai kasus dan ketentuan yang berlaku.

### Status terkini

- Build CI dan pemeriksaan Vercel pada commit di atas: **lulus**.
- Fallback gambar sosial raster: **sudah diterapkan**.
- Skrip debug sementara: **sudah dibersihkan**.
- Audit browser dan verifikasi langsung URL publik: **belum selesai**.
- Peninjauan konten teknis SLF/PBG dengan rujukan resmi: **masih terbuka**.


## 11. Status audit setelah rujukan resmi — 2026-10-15

### Perubahan yang sudah masuk ke main

- PR #7 menambahkan blok rujukan resmi yang dapat digunakan ulang pada artikel SLF dan checklist konsultasi. Tautan mengarah ke PP Nomor 16 Tahun 2021 pada JDIH Kementerian PUPR dan portal SIMBG.
- PR #8 menambahkan bagian rujukan resmi yang sama pada seluruh halaman detail layanan. Teks pendamping menegaskan bahwa penerapan regulasi dan kebutuhan dokumen harus diverifikasi sesuai kasus bangunan.
- Merge PR #8: `248b8787de63884f206f3a8d419c706d81281381`.
- GitHub Actions untuk commit merge tersebut: **success** — [run #38678915815](https://github.com/skyforgged/konsultan-slf/actions/runs/38678915815). Tahap type-check dan build lulus.

### Status Vercel

- Vercel melaporkan `api-deployments-young-hobby-team-24h`: batas lebih dari 100 deployment dalam jendela 24 jam.
- Ini adalah pembatasan kuota deployment, bukan kegagalan type-check/build pada GitHub Actions.
- Jangan menyatakan perubahan terbaru telah terdeploy ke produksi sampai Vercel berhasil melakukan deployment setelah kuota pulih. Situs yang sudah live sebelumnya tidak otomatis berarti commit terbaru sudah dipublikasikan.

### Audit konten layanan

Penelaahan source pada enam halaman layanan menunjukkan pola komunikasi yang berhati-hati: daftar dokumen diposisikan sebagai bahan konsultasi awal, kebutuhan teknis disesuaikan dengan kasus, dan penerbitan SLF/PBG tidak dijanjikan. As-built drawing dan pengkajian teknis juga menjelaskan batasan verifikasi lapangan, metode, data, dan ruang lingkup.

### Pekerjaan yang masih terbuka

1. Verifikasi browser dan URL produksi setelah deployment tersedia: respons HTTP, rendering, layout responsif, keyboard navigation, serta navigasi anchor/daftar isi.
2. Audit akurasi regulasi dengan memeriksa isi peraturan dan panduan resmi yang berlaku, bukan hanya keberadaan tautan.
3. Uji akhir hasil build terbaru dan crawl tautan internal setelah semua perubahan konten.
4. Pantau deployment Vercel tanpa memicu percobaan deployment yang tidak perlu selama limit aktif.

### Batas klaim

GitHub Actions yang lulus memverifikasi build dan skrip pemeriksaan pada artefak statis. Itu tidak membuktikan deployment terbaru, status HTTP publik, tampilan browser, atau keputusan hukum/teknis untuk bangunan tertentu.


## 9. Audit regulasi dan pemeriksaan aksesibilitas statis — 2026-10-15

### Rujukan resmi yang diperiksa
- **PP Nomor 16 Tahun 2021** tercatat berstatus berlaku pada JDIH Kementerian PKP dan basis data peraturan BPK. Rujukan: https://jdih.pkp.go.id/produk-hukum/pp-16-2021 dan https://peraturan.bpk.go.id/Details/161846/pp-no-16-.
- **SIMBG resmi** menjelaskan proses PBG/SLF melalui sistem tersebut. FAQ-nya juga membedakan kasus bangunan yang sudah memiliki IMB dari bangunan eksisting yang belum memiliki PBG/IMB. Rujukan: https://simbg.pu.go.id/dashboard.
- PP 16/2021 merupakan rujukan utama yang relevan untuk penyelenggaraan bangunan gedung, tetapi bukan berarti semua persyaratan teknis dan prosedur tiap bangunan identik. Ketentuan teknis dan administrasi dapat bergantung pada jenis/fungsi bangunan, kondisi dokumen lama, perubahan bangunan, serta implementasi pemerintah daerah.

### Kriteria editorial yang harus dipertahankan
- Jangan menyatakan bahwa satu daftar dokumen berlaku universal untuk semua bangunan.
- Jangan menyimpulkan bahwa ketiadaan satu dokumen lama otomatis menentukan hasil permohonan.
- Jangan menjanjikan waktu penerbitan atau hasil persetujuan yang berada di luar kendali konsultan.
- Untuk klaim prosedural yang spesifik, tautkan rujukan resmi dan nyatakan konteks kasusnya; bila tidak dapat diverifikasi, gunakan bahasa bersyarat dan arahkan pemohon untuk konfirmasi melalui SIMBG/pemerintah daerah.
- Tautan ke peraturan saja bukan bukti bahwa seluruh isi halaman telah lolos audit hukum. Setiap klaim rinci tetap perlu dicocokkan dengan pasal/panduan yang relevan dan ditinjau kembali jika regulasi berubah.

### Pemeriksaan aksesibilitas statis (source-only)
- Navigasi header menggunakan elemen `nav` dengan `aria-label`, dan form kontak memakai `label` yang terhubung ke ID kontrol; ini merupakan praktik yang baik.
- Navigasi utama disembunyikan pada breakpoint mobile (`hidden ... md:flex`), sementara CTA header tetap terlihat dan navigasi footer tersedia. Perlu verifikasi pada perangkat nyata bahwa pengguna mobile dapat menemukan semua tujuan navigasi dengan mudah.
- Belum ditemukan tautan “Skip to content” pada `BaseLayout.astro`. Ini kandidat perbaikan akses keyboard berikutnya; implementasinya harus memastikan setiap halaman memiliki target utama yang unik dan valid sebelum link ditambahkan.
- Pemeriksaan source tidak dapat membuktikan urutan fokus, kontras terukur, perilaku keyboard, zoom/reflow, atau hasil screen reader. Kriteria ini tetap menunggu pengujian browser.

### Status kelompok audit
- Audit awal rujukan regulasi: **dilakukan**; klaim prosedural rinci tetap perlu peninjauan per halaman.
- Aksesibilitas UI: **pemeriksaan statis awal selesai**, pengujian browser belum dilakukan.
- Kontak/alamat/jam operasional: **belum dikonfirmasi oleh pemilik**, tidak diubah oleh audit ini.
- Produksi/HTTP: **belum terverifikasi**; jangan melakukan deployment tambahan saat limit Vercel masih aktif.
