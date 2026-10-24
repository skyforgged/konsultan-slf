# Rancangan Halaman Kemitraan Cabang & Perwakilan

Status: draf untuk diskusi, belum implementasi ke `src/content/pages/`.

## 1. Tujuan halaman

Halaman ini dimaksudkan sebagai halaman resmi perusahaan untuk menyampaikan bahwa perusahaan membuka kesempatan bagi individu, kelompok, atau badan usaha di berbagai kota untuk menjadi cabang atau perwakilan layanan konsultasi SLF/PBG.

Tujuan utama:

- Menjelaskan peluang kemitraan daerah secara jelas.
- Menyaring calon mitra yang serius dan sesuai profil.
- Mengurangi ekspektasi yang keliru, misalnya anggapan bahwa mitra bisa menjamin SLF/PBG pasti terbit.
- Mengumpulkan peminat dari kota yang belum terjangkau langsung.
- Menjadi pintu masuk komunikasi dan pendaftaran calon cabang/perwakilan.

## 2. Rekomendasi identitas halaman

Beberapa opsi nama dan URL:

| Opsi slug | Judul halaman | Cocok untuk |
| --- | --- | --- |
| `/kemitraan/` | Kemitraan Cabang & Perwakilan SLF/PBG | Paling aman, fleksibel, dan profesional |
| `/jadi-perwakilan/` | Jadilah Perwakilan SLF/PBG di Kota Anda | Lebih persuasif, cocok untuk kampanye |
| `/cabang-dan-perwakilan/` | Cabang dan Perwakilan Daerah | Lebih eksplisit, tapi agak panjang |

Rekomendasi sementara:

- Slug: `kemitraan`
- Judul: `Kemitraan Cabang & Perwakilan SLF/PBG`
- Navigasi: `Kemitraan`

Alasan: slug `/kemitraan/` cukup umum untuk menampung beberapa skema, misalnya cabang resmi, perwakilan pemasaran, mitra lokal, atau referral.

## 3. Target pembaca

Halaman ini menyasar:

- Konsultan lokal yang sudah memiliki klien tetapi belum punya kapasitas teknis penuh.
- Arsitek, engineer, atau pengawas proyek yang sering bertemu kebutuhan SLF/PBG.
- Badan usaha jasa konstruksi atau konsultan perencana.
- Individu yang memiliki jaringan properti, pengelola gedung, atau komunitas bisnis daerah.
- Pihak yang ingin menjadi perpanjangan merek perusahaan di kota tertentu.

Pesan penting yang harus muncul sejak awal:

> Kemitraan ini bukan jual beli izin, bukan jaminan SLF/PBG terbit, dan bukan jalur pintas regulasi. Mitra membantu edukasi awal, pengumpulan kebutuhan klien, koordinasi lokal, dan pemasaran layanan, sementara kajian teknis tetap mengikuti kompetensi, dokumen, kondisi bangunan, serta ketentuan pihak berwenang.

## 4. Posisi layanan yang ingin ditawarkan

Perlu diputuskan apakah perusahaan membuka:

1. **Cabang resmi**
   - Menggunakan nama/merek perusahaan.
   - Memiliki area eksklusif atau semi-eksklusif.
   - Perlu perjanjian, SOP, kontrol kualitas, dan possibly tim teknis terverifikasi.
   - Risiko lebih tinggi, tetapi branding lebih kuat.

2. **Perwakilan pemasaran / business development**
   - Fokus mencari dan mengarahkan calon klien.
   - Tidak menangani kajian teknis penuh.
   - Lebih ringan dan lebih cepat dijalankan.
   - Cocok untuk kota dengan peminat tetapi belum ada tim teknis lokal.

3. **Mitra lokal kolaboratif**
   - Mitra sudah punya klien dan kebutuhan proyek.
   - Perusahaan membantu aspek teknis, dokumen, atau pendampingan proses.
   - Pembagian peran dan fee perlu jelas.

4. **Program referral**
   - Sederhana: mitra mengarahkan leads dan mendapat kompensasi/referral fee.
   - Minim risiko, tetapi kurang membangun kehadiran daerah.

Rekomendasi sementara untuk halaman: tampilkan beberapa opsi skema, tetapi beri penekanan bahwa bentuk kerja sama final ditentukan setelah verifikasi dan diskusi.

## 5. Struktur halaman yang diusulkan

| Bagian | Tujuan | Component Astro yang cocok |
| --- | --- | --- |
| Hero / pembuka | Menyampaikan peluang dan CTA utama | `page-header` |
| Peluang kemitraan daerah | Menjelaskan konteks pasar SLF/PBG di kota-kota | `section` |
| Manfaat bergabung | Menunjukkan nilai bagi calon mitra | `feature-card-grid` |
| Profil mitra yang dicari | Menyaring calon yang sesuai | `checklist-card` |
| Skema kemitraan | Menjelaskan pilihan cabang/perwakilan/referral | `comparison-table` atau `section` |
| Lingkup peran mitra | Mempertegas apa yang boleh dan tidak boleh dilakukan | `checklist-card` |
| Alur pendaftaran | Memberi kejelasan proses seleksi | `process-timeline` |
| Dokumen yang perlu disiapkan | Mengurangi tanya jawab berulang | `checklist-card` |
| Dukungan perusahaan | Menunjukkan nilai kerja sama | `section` atau `feature-card-grid` |
| Catatan kepatuhan | Mencegah klaim berlebihan | `note` |
| FAQ | Menjawab keberatan umum | `faq` |
| CTA pendaftaran | Mengumpulkan peminat | `cta` atau `contact-panel` |

## 6. Usulan alur konten

### 6.1 Hero

Judul:

> Buka kesempatan menjadi cabang atau perwakilan layanan SLF/PBG di kota Anda.

Deskripsi:

> Kami membuka ruang kolaborasi bagi konsultan, tenaga ahli, badan usaha, dan profesional lokal yang ingin membantu pemilik bangunan memahami kebutuhan SLF/PBG, sekaligus menjadi jembatan layanan pendampingan di daerah.

CTA:

- `Daftar sebagai calon mitra`
- `Pelajari skema kemitraan`

### 6.2 Peluang kemitraan daerah

Isi utama:

- Kebutuhan SLF/PBG tidak hanya ada di kota besar.
- Banyak pemilik bangunan eksisting, pengelola gedung, dan pelaku usaha yang membutuhkan edukasi awal.
- Kehadiran mitra lokal membantu menjembatani komunikasi, pengumpulan data awal, dan koordinasi pemeriksaan.
- Perusahaan tetap menjaga standar teknis dan kepatuhan regulasi.

Contoh narasi:

> Seiring meningkatnya kebutuhan legalitas dan kelaikan fungsi bangunan, banyak pemilik gedung di daerah membutuhkan pendampingan yang jelas, jujur, dan sesuai prosedur. Kemitraan cabang atau perwakilan memungkinkan kami hadir lebih dekat dengan calon klien, tanpa mengorbankan kualitas kajian teknis dan integritas proses perizinan.

### 6.3 Manfaat bergabung

Poin yang bisa ditampilkan:

- Akses ke kerangka layanan SLF/PBG yang terstruktur.
- Materi penjelasan awal untuk calon klien.
- Pendampingan penyusunan kebutuhan dokumen.
- Peluang membangun basis klien lokal.
- Kolaborasi dengan tim teknis perusahaan.
- Penempatan sebagai mitra terverifikasi jika memenuhi kriteria.

### 6.4 Profil mitra yang dicari

Contoh checklist:

- Berdomisili atau memiliki jaringan kuat di kota/target area tertentu.
- Memiliki pemahaman dasar dunia properti, konstruksi, perizinan, atau layanan profesional.
- Mampu berkomunikasi dengan pemilik bangunan, pengelola gedung, kontraktor, atau konsultan lokal.
- Setuju bekerja sesuai etika: tidak menjanjikan SLF/PBG pasti terbit.
- Memiliki badan usaha atau kemampuan legal untuk bekerja sama, jika diperlukan.
- Bersedia melalui proses verifikasi dan kesepakatan tertulis.

### 6.5 Skema kemitraan

Tampilkan sebagai tabel/perbandingan:

| Skema | Peran utama | Cocok untuk | Batasan |
| --- | --- | --- | --- |
| Cabang resmi | Menjadi perpanjangan layanan perusahaan di area tertentu | Tim lokal dengan kapasitas bisnis dan teknis | Perlu seleksi, perjanjian, dan kontrol kualitas |
| Perwakilan pemasaran | Mengarahkan calon klien dan membantu koordinasi awal | Profesional dengan jaringan lokal | Tidak menggantikan kajian teknis bersertifikat |
| Mitra kolaboratif | Membawa proyek/klien, perusahaan membantu teknis | Konsultan, arsitek, engineer lokal | Ruang lingkup disepakati per kasus |
| Referral | Mengarahkan leads | Perorangan atau komunitas | Kompensasi dan peran lebih terbatas |

### 6.6 Lingkup peran mitra

Yang boleh dilakukan mitra:

- Edukasi awal tentang SLF/PBG.
- Mengumpulkan informasi dasar bangunan.
- Membantu calon klien menyiapkan dokumen awal.
- Menjadi penghubung komunikasi lokal.
- Mendampingi koordinasi survei atau pertemuan awal.
- Mempromosikan layanan perusahaan sesuai pedoman merek.

Yang tidak boleh diklaim mitra:

- Menjamin SLF/PBG pasti terbit.
- Menjamin durasi proses tertentu.
- Mengatasnamakan keputusan instansi berwenang.
- Memberikan kesimpulan teknis tanpa data dan kompetensi yang sesuai.
- Menggunakan merek perusahaan tanpa persetujuan tertulis.

### 6.7 Alur pendaftaran

Usulan timeline:

1. Calon mitra mengisi formulir minat.
2. Perusahaan meninjau profil, lokasi, dan kapasitas awal.
3. Diskusi online/offline untuk memahami kebutuhan dan ekspektasi.
4. Verifikasi dokumen legal dan kompetensi, jika diperlukan.
5. Kesepakatan ruang lingkup, wilayah, dan skema kerja sama.
6. Onboarding: materi, pedoman komunikasi, dan alur lead.
7. Mulai berjalan sebagai calon mitra atau mitra terverifikasi.

### 6.8 Dokumen yang perlu disiapkan

Contoh checklist:

- Nama lengkap atau nama badan usaha.
- Kota dan wilayah yang ingin diajukan.
- Profil singkat usaha/profesional.
- Kontak utama.
- Pengalaman di bidang konstruksi, properti, perizinan, atau konsultan.
- Dokumen legalitas, jika sudah memiliki badan usaha.
- Rencana singkat cara menjangkau calon klien.

### 6.9 Dukungan dari perusahaan

Poin yang bisa dijanjikan secara hati-hati:

- Panduan layanan SLF/PBG.
- Template penjelasan awal untuk calon klien.
- Pendampingan penyusunan kebutuhan dokumen.
- Koordinasi untuk kasus yang memerlukan kajian teknis.
- Daftar Periksa kualitas komunikasi dan etika promosi.
- Peluang kolaborasi proyek sesuai kesepakatan.

Hindari dulu janji seperti:

- “Materi branding lengkap”
- “Sistem CRM”
- “Exclusivity wilayah”
- “Training resmi”
  
kecuali memang sudah tersedia dan disetujui.

### 6.10 Catatan kepatuhan

Blok `note` yang diusulkan:

> Kemitraan ini dirancang untuk memperluas edukasi dan pendampingan awal, bukan untuk menjamin penerbitan SLF/PBG. Hasil proses tetap bergantung pada kelengkapan dokumen, kondisi bangunan, evaluasi teknis, serta ketentuan dan kewenangan pihak yang berwenang.

### 6.11 FAQ

Pertanyaan yang sebaiknya dijawab:

- Apakah mitra harus memiliki latar belakang teknik?
- Apakah perwakilan boleh menangani kajian teknis sendiri?
- Bagaimana pembagian fee atau kompensasi?
- Apakah ada wilayah eksklusif?
- Apakah mitra bisa menggunakan nama perusahaan?
- Berapa lama proses seleksi?
- Apakah harus memiliki badan usaha?
- Bagaimana jika di kota saya belum ada klien?

### 6.12 CTA akhir

CTA utama:

> Tertarik menjadi cabang atau perwakilan di kota Anda?

Tombol:

- `Daftar sebagai calon mitra`
- `Konsultasikan skema kemitraan`

## 7. Usulan frontmatter halaman

Catatan: `id`, `ulid`, `pubDate`, `updatedDate`, dan aset gambar masih perlu diisi unik saat implementasi. Untuk tahap diskusi, halaman sebaiknya dibuat sebagai draft terlebih dahulu.

```yaml
---
id: TBD
ulid: TBD
slug: kemitraan
title: "Kemitraan Cabang & Perwakilan SLF/PBG"
description: "Kesempatan bagi konsultan, profesional, dan badan usaha lokal untuk menjadi cabang atau perwakilan pendampingan SLF/PBG di kota dengan kebutuhan peminat."
pubDate: TBD
updatedDate: TBD
image: "/images/illustrations/service-directory.svg"
socialImage: "/images/social/kemitraan.webp"
type: "page"
draft: true
navLabel: "Kemitraan"
canonical: "/kemitraan/"
blocks:
  - component: "page-header"
    eyebrow: "Kemitraan daerah"
    heading: "Cabang dan perwakilan SLF/PBG"
    intro: "Kami membuka kesempatan bagi profesional, konsultan, dan badan usaha lokal untuk menjadi jembatan layanan pendampingan SLF/PBG di kota Anda."
    image: "/images/illustrations/service-directory.svg"
    imageAlt: "Ilustrasi kemitraan layanan konsultasi SLF dan PBG di daerah"
  - component: "section"
    id: "peluang"
    heading: "Mengapa kemitraan daerah relevan?"
    content:
      - type: "p"
        text: "Kebutuhan pemahaman SLF dan PBG tidak hanya ada di kota besar. Banyak pemilik bangunan, pengelola gedung, dan pelaku usaha yang membutuhkan edukasi awal, pemetaan dokumen, serta pendampingan proses yang jelas dan jujur."
      - type: "p"
        text: "Melalui cabang atau perwakilan, perusahaan dapat hadir lebih dekat dengan calon klien sambil tetap menjaga standar kajian teknis, etika layanan, dan kepatuhan terhadap ketentuan yang berlaku."
  - component: "feature-card-grid"
    id: "manfaat"
    title: "Manfaat bergabung"
    columns: 3
    items:
      - title: "Membangun basis klien lokal"
      - title: "Berkoordinasi dengan tim pendampingan SLF/PBG"
      - title: "Menjadi mitra terverifikasi sesuai kriteria"
  - component: "checklist-card"
    id: "profil-mitra"
    title: "Profil calon mitra yang dicari"
    description: "Kandidat yang sesuai umumnya memiliki kombinasi jejaring lokal, pemahaman layanan profesional, dan komitmen pada etika informasi."
    items:
      - label: "Berdomisili atau memiliki jaringan di kota/target area tertentu."
      - label: "Paham dunia properti, konstruksi, perizinan, atau layanan konsultan."
      - label: "Mampu berkomunikasi dengan pemilik bangunan dan pengelola gedung."
      - label: "Setuju tidak menjanjikan SLF/PBG pasti terbit."
      - label: "Bersedia melalui verifikasi dan kesepakatan tertulis."
  - component: "comparison-table"
    id: "skema"
    title: "Skema kemitraan yang dapat didiskusikan"
    head:
      - "Skema"
      - "Peran utama"
      - "Cocok untuk"
    rows:
      - ["Cabang resmi", "Perpanjangan layanan perusahaan di area tertentu", "Tim lokal dengan kapasitas bisnis dan teknis"]
      - ["Perwakilan pemasaran", "Mengarahkan calon klien dan koordinasi awal", "Profesional dengan jaringan lokal"]
      - ["Mitra kolaboratif", "Membawa proyek/klien, perusahaan membantu teknis", "Konsultan, arsitek, atau engineer lokal"]
      - ["Referral", "Mengarahkan leads", "Perorangan atau komunitas"]
  - component: "process-timeline"
    id: "alur"
    title: "Alur pendaftaran calon mitra"
    steps:
      - title: "Isi formulir minat"
        description: "Calon mitra menyampaikan profil, kota, dan pengalaman singkat."
      - title: "Peninjauan awal"
        description: "Perusahaan menilai kesesuaian lokasi, kapasitas, dan profil kandidat."
      - title: "Diskusi skema"
        description: "Dibahas bentuk kerja sama, peran, wilayah, dan ekspektasi."
      - title: "Verifikasi & kesepakatan"
        description: "Dokumen dan ruang lingkup disepakati sebelum mitra mulai berjalan."
  - component: "note"
    id: "catatan-kepatuhan"
    variant: "warning"
    title: "Batasan penting"
    text: "Kemitraan ini bukan jaminan penerbitan SLF/PBG, bukan jalur pintas regulasi, dan tidak memberi wewenang kepada mitra untuk menjanjikan hasil atau durasi proses. Keputusan tetap berada pada pihak berwenang sesuai kondisi bangunan dan ketentuan yang berlaku."
  - component: "faq"
    id: "faq"
    heading: "Pertanyaan umum"
    items:
      - question: "Apakah mitra harus memiliki latar belakang teknik?"
        answer: "Tidak selalu untuk semua skema. Perwakilan pemasaran dapat berasal dari latar belakang bisnis atau properti, selama bekerja sesuai batasan dan tidak memberikan kesimpulan teknis tanpa kompetensi yang sesuai."
      - question: "Apakah ada wilayah eksklusif?"
        answer: "Belum tentu. Eksklusivitas bergantung pada skema kerja sama, kinerja mitra, kebutuhan pasar, dan kesepakatan tertulis."
      - question: "Apakah mitra boleh menggunakan nama perusahaan?"
        answer: "Hanya jika diberi persetujuan tertulis dan mengikuti pedoman penggunaan merek yang disepakati."
  - component: "cta"
    id: "cta-kemitraan"
    heading: "Tertarik menjadi cabang atau perwakilan?"
    message: "Sampaikan profil dan kota yang Anda ajukan. Kami akan meninjau kesesuaian awal sebelum membahas skema kerja sama."
    button: "Daftar sebagai calon mitra"
---
```

## 8. Component yang perlu dicek sebelum implementasi

Sebelum halaman dibuat sungguhan, perlu dipastikan:

- `comparison-table` tersedia dan cocok untuk tabel skema. Sudah terlihat dipakai di beberapa artikel, tetapi perlu dicek props-nya.
- `contact-panel` atau form mana yang dipakai untuk mengumpulkan pendaftaran. Jika form belum punya endpoint/aksi, mulai dengan CTA WhatsApp/email dulu.
- Aset `socialImage` `/images/social/kemitraan.webp` akan dihasilkan dari SVG yang tersedia. Kalau ingin khusus, perlu SVG baru.
- `navLabel` perlu ditambahkan ke navigasi melalui `src/config/ui.ts`, bukan hardcode di layout.
- Halaman `.astro` harus tetap tipis: ambil data dari `src/content/pages/kemitraan.md`, render layout/blocks.

## 9. Mekanisme pengumpulan peminat

Opsi:

1. **WhatsApp CTA**
   - Paling sederhana.
   - Menggunakan nomor dari `src/config/site.ts`.
   - Cocok untuk MVP.

2. **Formulir kontak existing**
   - Jika `contact-panel` sudah punya mekanisme submit yang jelas.
   - Perlu menambah opsi layanan “Kemitraan cabang/perwakilan”.

3. **External form**
   - Google Form/Tally/Formspree jika ingin field lebih terstruktur.
   - Perlu keputusan apakah allowed di repo/branding.

Rekomendasi sementara:

- Tahap awal: `cta` dengan tombol WhatsApp atau email.
- Tahap berikutnya: form khusus calon mitra dengan field kota, profil, pengalaman, dan nomor kontak.

## 10. SEO yang diusulkan

- Title: `Kemitraan Cabang & Perwakilan SLF/PBG | Konsultan SLF & PBG`
- Meta description: `Buka kesempatan menjadi cabang atau perwakilan layanan pendampingan SLF/PBG di kota Anda. Cocok untuk konsultan, profesional, dan badan usaha lokal.`
- Canonical: `/kemitraan/`
- Internal link:
  - Dari footer atau menu utama jika sudah disetujui.
  - Dari halaman layanan atau kontak bila relevan.
- JSON-LD:
  - Bisa memakai `WebPage` atau `Service` sederhana.
  - Jangan memakai schema yang mengklaim organisasi baru/cabang resmi jika belum ada entitas legal.

## 11. Risiko yang perlu dikelola

| Risiko | Mitigasi di halaman |
| --- | --- |
| Calon mitra mengira bisa menjamin SLF/PBG terbit | Blok note tegas dan FAQ |
| Penyalahgunaan nama perusahaan | Syarat persetujuan tertulis dan batasan merek |
| Kualitas informasi teknis tidak seragam | Batasi peran perwakilan non-teknis; eskalasi ke tim kompeten |
| Harapan eksklusivitas wilayah | Jelaskan eksklusivitas bergantung kesepakatan |
| Lead tidak terkumpul rapi | Siapkan form/WhatsApp Business dan SOP tindak lanjut |
| Topik terlalu lebar seperti “bisnis tanpa modal” | Gunakan bahasa profesional, bukan skema cepat kaya |

## 12. Metrik keberhasilan halaman

Setelah halaman tayang, ukur:

- Jumlah kunjungan ke `/kemitraan/`.
- Jumlah klik CTA.
- Jumlah pendaftar calon mitra.
- Kualitas pendaftar per kota.
- Jumlah mitra yang lolos verifikasi.
- Jumlah lead klien yang berasal dari mitra.
- Waktu respons perusahaan ke calon mitra.

## 13. Keputusan yang dibutuhkan dari Anda

Sebelum saya ubah rancangan ini menjadi halaman konten, perlu diputuskan:

1. Nama halaman dan slug:
   - `/kemitraan/`
   - `/jadi-perwakilan/`
   - `/cabang-dan-perwakilan/`
   - atau nama lain.

2. Skema yang ingin ditampilkan:
   - hanya perwakilan pemasaran,
   - cabang resmi + perwakilan,
   - atau semua opsi termasuk referral.

3. Apakah halaman boleh menyebut potensi wilayah eksklusif?
   - Ya, dengan catatan “bergantung kesepakatan”.
   - Tidak, hindari kata eksklusif.

4. Mekanisme CTA:
   - WhatsApp,
   - email,
   - form existing,
   - external form,
   - atau tombol sementara.

5. Kota prioritas:
   - perlu daftar kota awal, atau
   - biarkan umum: “kota dengan peminat SLF/PBG”.

6. Syarat mitra:
   - apakah wajib badan usaha,
   - apakah boleh perorangan,
   - apakah perlu pengalaman teknis.

7. Status publish:
   - draft dulu,
   - atau langsung publish setelah build lulus.

## 14. Langkah implementasi berikutnya

Jika rancangan ini disetujui:

1. Konfirmasi keputusan di bagian 13.
2. Saya siapkan draft `src/content/pages/kemitraan.md`.
3. Tambahkan label navigasi di `src/config/ui.ts` jika diperlukan.
4. Buat halaman route `.astro` yang hanya mengambil data dan merender layout/blocks.
5. Pastikan `imageAlt`, `description`, dan semua teks berasal dari frontmatter.
6. Jalankan `npm run build`.
7. Review output HTML dan SEO check.

## 15. Formulir jawaban keputusan (isi langsung di file ini)

Instruksi: silakan isi bagian `Jawaban:` pada setiap butir. Jika belum memutuskan, tulis `belum diputuskan` atau kosongkan. Jawaban pada file ini akan dipakai sebagai acuan implementasi berikutnya.

### 1. Identitas halaman

- Opsi slug:
  - `/kemitraan/`
  - `/jadi-perwakilan/`
  - `/cabang-dan-perwakilan/`
  - slug lain:
- Usulan judul halaman: `Kemitraan Cabang & Perwakilan SLF/PBG`
- Usulan label navigasi: `Kemitraan`
- Jawaban slug:
- Jawaban judul halaman:
- Jawaban label navigasi:
- Catatan tambahan:

### 2. Skema kemitraan yang ingin ditampilkan

- Opsi:
  - hanya perwakilan pemasaran,
  - cabang resmi + perwakilan,
  - semua opsi termasuk referral,
  - kombinasi lain:
- Jawaban:
- Skema yang tidak perlu ditampilkan:
- Alasan:

### 3. Penyebutan wilayah eksklusif

- Opsi:
  - boleh disebut dengan catatan “bergantung kesepakatan”,
  - jangan gunakan kata eksklusif,
  - opsi lain:
- Jawaban:
- Kalimat yang disetujui jika menyebut eksklusivitas:

### 4. Mekanisme CTA dan pendaftaran peminat

- Opsi:
  - WhatsApp,
  - email,
  - form existing,
  - external form,
  - tombol sementara,
  - kombinasi:
- Jawaban:
- Teks tombol utama:
- Teks tombol sekunder:
- Target tautan/aksi:
- Jika form: field yang wajib ada:

### 5. Kota prioritas

- Opsi:
  - biarkan umum: “kota dengan peminat SLF/PBG”,
  - tampilkan daftar kota awal,
  - opsi lain:
- Jawaban:
- Daftar kota awal, jika ada:
- Apakah kota perlu muncul sebagai blok tersendiri? Ya / Tidak / Belum tahu:

### 6. Syarat mitra

- Apakah wajib memiliki badan usaha?
  - Ya
  - Tidak
  - Bergantung skema
- Apakah perorangan boleh mendaftar?
  - Ya
  - Tidak
  - Bergantung skema
- Apakah perlu pengalaman teknis?
  - Ya
  - Tidak
  - Bergantung skema
- Jawaban ringkas:
- Syarat mutlak yang harus ditulis di halaman:
- Syarat yang hanya jadi pertimbangan seleksi:

### 7. Status publikasi halaman

- Opsi:
  - draft dulu,
  - langsung publish setelah build lulus,
  - lain:
- Jawaban:

### 8. Konten yang perlu disesuaikan

- Heading hero:
- Intro hero:
- Poin manfaat yang disetujui:
- Poin profil mitra yang disetujui:
- Poin lingkup peran mitra yang disetujui:
- FAQ yang perlu ditambah/diubah:
- Catatan kepatuhan yang disetujui:
- Teks CTA akhir:
- Jawaban/catatan bebas:

### 9. Aset visual dan SEO

- Gambar/ilustrasi:
  - pakai existing `/images/illustrations/service-directory.svg`,
  - pakai SVG lain:
  - perlu SVG khusus:
- Jawaban:
- `imageAlt` yang disetujui:
- Meta description yang disetujui:
- Kata kunci/fokus SEO tambahan:

### 10. Instruksi tambahan untuk agen

- Hal yang tidak boleh diubah:
- Hal yang harus ditegaskan di halaman:
- Gaya bahasa yang diinginkan:
- Batasan klaim yang harus dihormati:
- Jawaban/catatan lain:

## jawab:
ini jawaban saya
## 13. Keputusan yang dibutuhkan dari Anda


1. Nama halaman dan slug:
   - `/kemitraan/`
   
2. Skema yang ingin ditampilkan:
   - atau semua opsi termasuk referral.

3. Apakah halaman boleh menyebut potensi wilayah eksklusif?
   - Ya, dengan catatan “bergantung kesepakatan”.

4. Mekanisme CTA:
   - WhatsApp,
   - email,
   - form existing,
   - external form,
   - atau tombol sementara.

5. Kota prioritas:
   - biarkan umum: “kota dengan peminat SLF/PBG”.

6. Syarat mitra:
   - apakah wajib badan usaha,
   
7. Status publish:
   - draft dulu,
   - atau langsung publish setelah build lulus.
   