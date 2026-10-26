# UM-14 Register Dokumen Kemitraan

| Atribut | Isi |
|---|---|
| ID matriks | UM-14 (UMUM, P0) |
| Versi | 0.1 (draf) |
| Tanggal draf | 2026-10-25 |
| Pemilik | Belum ditetapkan (usulan: administrasi program) |
| Status | Perlu persetujuan internal |

> Draf kerja. Dokumen ini hanya mencatat; tidak menggantikan persetujuan pejabat berwenang. Status "Siap digunakan" tidak boleh dipakai sebelum persetujuan internal dan, untuk dokumen bertanda perlu tinjauan hukum pada matriks, sebelum tinjauan hukum selesai.

## 1. Tujuan

Satu daftar untuk mengetahui dokumen kemitraan mana yang ada, versi berapa, siapa pemiliknya, dan kapan berlaku. Daftar ini juga dasar menjawab: dokumen mana yang boleh diberikan kepada calon mitra.

## 2. Aturan penomoran dan versi

- ID memakai kode matriks induk (UM, RF, KL, WD, CB, OP). Dokumen pendamping non-matriks memakai awalan `00-`.
- Versi `0.x` untuk draf. Versi `1.0` hanya setelah persetujuan tercatat pada register. Perubahan kecil menaikkan angka kedua, perubahan substansi menaikkan angka pertama.
- Status memakai kosakata matriks: Belum diinventarisasi, Belum disusun, Dalam penyusunan, Perlu tinjauan hukum, Perlu persetujuan internal, Siap digunakan, Perlu revisi.
- Dokumen yang sudah ditandatangani pihak lain tidak diubah; buat versi baru dan catat alasannya.
- Berkas draf disimpan di `docs/kemitraan/`. Salinan yang ditandatangani disimpan di penyimpanan internal yang akses-nya dibatasi, dan lokasinya dicatat pada kolom catatan: [DIISI PEMILIK: lokasi penyimpanan].

## 3. Hasil inventarisasi berkas yang sudah ada (langkah 1 matriks)

Dicek pada repo `skyforgged/konsultan-slf` per 2026-10-25. Dokumen di luar repo (perjanjian lama, profil perusahaan, templat) belum terperiksa dan harus ditambahkan oleh pemilik program.

| Berkas | Isi | Relevansi ke matriks | Dapat dipakai sebagai dokumen resmi? |
|---|---|---|---|
| `docs/rancangan-halaman-kemitraan-cabang-perwakilan.md` | Rancangan halaman dan keputusan awal | Sumber UM-03, UM-05, UM-11, RF/KL/WD/CB | Tidak (rancangan) |
| `docs/ROADMAP-KEMITRAAN.md` | Roadmap, KPI, status prospek | Sumber UM-06, UM-15 | Tidak (strategi) |
| `docs/PROFIL-SEKOCI.md` | Opsi profil pendukung | Sumber UM-08 | Tidak |
| `docs/persiapan-dokumen-skema-kemitraan.md` | Daftar dokumen dan urutan | Dasar matriks | Tidak |
| `docs/matriks-induk-dokumen-kemitraan.md` | Daftar kendali 50 dokumen | Induk register ini | Dokumen kendali |
| `src/content/pages/kemitraan.md` dan `kemitraan/*.md` | Halaman publik lima buah | Bahan publik UM-03; bukan dokumen kontrak | Publik, bukan ketentuan mengikat |
| `src/config/site.ts` | Nama badan usaha, alamat, kontak | Sumber data UM-01 | Sumber data |

Kesimpulan inventarisasi: belum ada satu pun dokumen matriks yang berstatus selesai. Prioritas berikut: UM-01 sampai UM-09 dan UM-11 (P0).

## 4. Daftar keputusan yang menahan beberapa dokumen

| Keputusan | Menahan dokumen |
|---|---|
| Penanggung jawab program dan pejabat penyetuju | Seluruh dokumen |
| Waktu respons prospek (SLA) | UM-06 |
| Dasar dan besaran imbalan | UM-11, RF-04, WD-06, KL-03 |
| Periode retensi data | UM-09 |
| Kriteria dan waktu evaluasi mitra | UM-05 |
| Status kepemilikan dan pendaftaran merek | UM-08, CB-03 |

## 5. Register (diperbarui pada setiap commit dokumen)

| ID | Dokumen | Berkas | Versi | Tanggal | Status | Pemilik | Catatan |
|---|---|---|---|---|---|---|---|
| 00-A | Brief topik kesiapan dokumen | `docs/kemitraan/00-brief-topik-dokumen-kemitraan.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | Belum ditetapkan | Pendamping, bukan dokumen matriks |
| 00-B | Penilaian risiko hukum program | `docs/kemitraan/00-penilaian-risiko-hukum-program-kemitraan.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | Belum ditetapkan | Pendamping; peta risiko di `aset/` |
| UM-14 | Register dokumen kemitraan | `docs/kemitraan/UM-14-register-dokumen.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | Belum ditetapkan | Dokumen ini |
| UM-01 | Profil perusahaan dan portofolio | `docs/kemitraan/UM-01-profil-perusahaan-dan-portofolio.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | (usulan) pimpinan/pemasaran | Hanya data site.ts terisi; bukti kompetensi dan portofolio menunggu pemilik |
| UM-02 | Ringkasan program kemitraan | `docs/kemitraan/UM-02-ringkasan-program-kemitraan.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | (usulan) pimpinan program | Tabel status dukungan mencegah klaim berlebih |
| UM-03 | Panduan perbandingan empat skema | `docs/kemitraan/UM-03-panduan-perbandingan-empat-skema.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | (usulan) pemilik program | Selaras dengan halaman publik; ada diagram pemilihan skema |
| UM-04 | Formulir pendaftaran minat mitra | `docs/kemitraan/UM-04-formulir-pendaftaran-minat-mitra.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | (usulan) administrasi program | Teks persetujuan data menunggu tinjauan hukum; ada padanan WhatsApp |
| UM-05 | Kriteria seleksi dan verifikasi mitra | `docs/kemitraan/UM-05-kriteria-seleksi-dan-verifikasi-mitra.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | (usulan) pemilik program | Waktu evaluasi menunggu keputusan; tanpa skor angka |
| UM-06 | SOP kualifikasi dan tindak lanjut prospek | `docs/kemitraan/UM-06-sop-prospek-kualifikasi-dan-tindak-lanjut.md` | 0.1 (draf) | 2026-10-25 | Perlu persetujuan internal | (usulan) administrasi/pemasaran | Dua alur: calon mitra dan calon klien; SLA menunggu keputusan |
| UM-07 | Standar perilaku dan etika mitra | `docs/kemitraan/UM-07-standar-perilaku-dan-etika-mitra.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | (usulan) pemilik program | Larangan jalur cepat dan suap; sanksi usulan menunggu tinjauan hukum |
| UM-08 | Pedoman merek dan materi pemasaran | `docs/kemitraan/UM-08-pedoman-merek-dan-materi-pemasaran.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | (usulan) pemasaran | Status merek belum diketahui; kebijakan platform perlu diverifikasi |
| UM-09 | Kebijakan data prospek dan klien | `docs/kemitraan/UM-09-kebijakan-data-prospek-dan-klien.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | (usulan) administrasi/pimpinan | Mengacu UU 27/2022; retensi dan peran pengendali menunggu hukum |
| UM-11 | Kebijakan imbalan komisi dan biaya | `docs/kemitraan/UM-11-kebijakan-imbalan-komisi-dan-biaya.md` | 0.1 (draf) | 2026-10-25 | Perlu tinjauan hukum | (usulan) pimpinan/keuangan | Angka dan pajak sengaja kosong; perlu keputusan dan konsultan pajak |
| UM-04 (rev) | Formulir pendaftaran minat mitra | `docs/kemitraan/UM-04-formulir-pendaftaran-minat-mitra.md` | 0.2 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) administrasi program | Selaras dengan formulir situs; 4 penghalang dicatat |
| 00-B (rev) | Penilaian risiko hukum program | `docs/kemitraan/00-penilaian-risiko-hukum-program-kemitraan.md` | 0.2 (draf) | 2026-10-26 | Perlu tinjauan hukum | Belum ditetapkan | Tambah R-13 (formulir situs) |
| UM-10 | Templat NDA dan perjanjian kerahasiaan | `docs/kemitraan/UM-10-templat-nda-perjanjian-kerahasiaan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) operasional/legal | Kerangka pasal; kapan NDA diperlukan per skema |
| RF-01 | Kerangka perjanjian referral | `docs/kemitraan/RF-01-perjanjian-referral.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/legal | Kerangka 15 pasal; tidak ditandatangani sebelum lampiran disetujui |
| RF-02 | Formulir penyerahan prospek dan bukti penerimaan | `docs/kemitraan/RF-02-formulir-penyerahan-prospek-dan-bukti-penerimaan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) admin kemitraan | Bukti persetujuan calon klien; bukti penerimaan bernomor |
| RF-03 | Aturan atribusi lead | `docs/kemitraan/RF-03-aturan-atribusi-lead.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/CRM | Periode dan batas waktu menunggu keputusan; ada contoh kasus |
| RF-04 | Ketentuan komisi referral | `docs/kemitraan/RF-04-ketentuan-komisi-referral.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) keuangan/pemilik program | Tanpa angka; contoh memakai simbol; pajak menunggu konsultan |
| RF-05 | Panduan komunikasi referral | `docs/kemitraan/RF-05-panduan-komunikasi-referral.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) penjualan/operasional teknis | Tabel boleh dan tidak boleh; skrip menjawab pertanyaan sulit |
| KL-01 | Kerangka PKS mitra kolaboratif | `docs/kemitraan/KL-01-perjanjian-kerja-sama-mitra-kolaboratif.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik proyek/legal | Tiga model kontrak dengan klien; 18 pasal |
| KL-02 | Templat SOW/KAK per proyek | `docs/kemitraan/KL-02-templat-sow-kak-per-proyek.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) manajer proyek/teknis | Kriteria penerimaan tidak boleh berupa terbitnya SLF/PBG |
| KL-03 | Matriks tanggung jawab (RACI) | `docs/kemitraan/KL-03-matriks-pembagian-tanggung-jawab-raci.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) manajer proyek/teknis | Usulan baku untuk model A; satu A per baris |
| KL-04 | Templat penawaran, anggaran, termin | `docs/kemitraan/KL-04-templat-penawaran-anggaran-termin.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) penjualan/keuangan | Nilai kosong; biaya resmi instansi dipisah; bagian internal terpisah |
| KL-05 | Checklist kompetensi dan kewenangan personel | `docs/kemitraan/KL-05-checklist-kompetensi-dan-kewenangan-personel.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) penanggung jawab teknis | Persyaratan sengaja tidak disebut; menunggu konfirmasi teknis dan hukum |
| KL-06 | SOP pengendalian mutu deliverable | `docs/kemitraan/KL-06-sop-pengendalian-mutu-deliverable.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) penanggung jawab teknis/mutu | Lima titik pemeriksaan; pembuat bukan pemeriksa |
| WD-01 | Kerangka perjanjian perwakilan daerah | `docs/kemitraan/WD-01-perjanjian-perwakilan-daerah.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/legal | Posisi baku: tidak berwenang kecuali tertulis di WD-05 |
| WD-02 | Templat surat penunjukan | `docs/kemitraan/WD-02-templat-surat-penunjukan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/pejabat berwenang | Bukan surat kuasa; daftar tegas kewenangan yang tidak diberikan |
| WD-03 | Rencana pengembangan pasar wilayah | `docs/kemitraan/WD-03-rencana-pengembangan-pasar-wilayah.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) perwakilan/pemilik program | Target aktivitas, bukan target penjualan |
| WD-04 | SOP pemasaran lokal dan koordinasi pusat | `docs/kemitraan/WD-04-sop-pemasaran-lokal-dan-koordinasi-pusat.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) operasional/pemasaran | Alur prospek lewat RF-02; larangan merujuk UM-07 |
| WD-05 | Matriks otorisasi perwakilan | `docs/kemitraan/WD-05-matriks-otorisasi-perwakilan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/keuangan/operasional | Bawaan paling ketat; selaras dengan halaman publik |
| WD-06 | Kebijakan biaya operasional dan insentif wilayah | `docs/kemitraan/WD-06-kebijakan-biaya-operasional-dan-insentif-wilayah.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) keuangan/pemilik program | Persetujuan sebelum pengeluaran; larangan biaya untuk pihak instansi |
| KL-02 | Templat SOW/KAK per proyek | `docs/kemitraan/KL-02-templat-sow-kak-per-proyek.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) manajer proyek/teknis | Kriteria penerimaan tidak boleh berupa terbitnya SLF/PBG |
| KL-04 | Templat penawaran, anggaran, termin | `docs/kemitraan/KL-04-templat-penawaran-anggaran-termin.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) penjualan/keuangan | Nilai kosong; biaya resmi instansi dipisah; bagian internal terpisah |
| KL-06 | SOP pengendalian mutu deliverable | `docs/kemitraan/KL-06-sop-pengendalian-mutu-deliverable.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) penanggung jawab teknis/mutu | Lima titik pemeriksaan; pembuat bukan pemeriksa |
| WD-02 | Templat surat penunjukan | `docs/kemitraan/WD-02-templat-surat-penunjukan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/pejabat berwenang | Bukan surat kuasa; daftar tegas kewenangan yang tidak diberikan |
| WD-04 | SOP pemasaran lokal dan koordinasi pusat | `docs/kemitraan/WD-04-sop-pemasaran-lokal-dan-koordinasi-pusat.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) operasional/pemasaran | Alur prospek lewat RF-02; larangan merujuk UM-07 |
| WD-06 | Kebijakan biaya operasional dan insentif wilayah | `docs/kemitraan/WD-06-kebijakan-biaya-operasional-dan-insentif-wilayah.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) keuangan/pemilik program | Persetujuan sebelum pengeluaran; larangan biaya untuk pihak instansi |
| UM-12 | Ketentuan umum kemitraan | `docs/kemitraan/UM-12-ketentuan-umum-kemitraan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/legal | Mencegah pertentangan antar-perjanjian skema; ada pembagian muatan |
| UM-13 | Evaluasi, perpanjangan, penangguhan, pengakhiran | `docs/kemitraan/UM-13-evaluasi-perpanjangan-penangguhan-pengakhiran.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/operasional | Ada diagram siklus; hak menanggapi sebelum keputusan |
| OP-01 | Checklist onboarding mitra | `docs/kemitraan/OP-01-checklist-onboarding-mitra.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin kemitraan | Tidak boleh beraktivitas sebelum bagian A dan B selesai |
| OP-02 | Daftar kontak, jalur eskalasi, dan SLA | `docs/kemitraan/OP-02-kontak-jalur-eskalasi-dan-sla.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) pemilik program/admin | Nama dan SLA kosong; pelanggaran berat langsung ke direksi |
| OP-03 | Register perjanjian aktif | `docs/kemitraan/OP-03-register-perjanjian-aktif.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin dokumen/legal | Beda dari UM-14: mencatat perjanjian yang sudah ditandatangani |
| KL-02 | Templat SOW/KAK per proyek | `docs/kemitraan/KL-02-templat-sow-kak-per-proyek.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) manajer proyek/teknis | Kriteria penerimaan tidak boleh berupa terbitnya SLF/PBG |
| KL-04 | Templat penawaran, anggaran, termin | `docs/kemitraan/KL-04-templat-penawaran-anggaran-termin.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) penjualan/keuangan | Nilai kosong; biaya resmi instansi dipisah; bagian internal terpisah |
| KL-06 | SOP pengendalian mutu deliverable | `docs/kemitraan/KL-06-sop-pengendalian-mutu-deliverable.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) penanggung jawab teknis/mutu | Lima titik pemeriksaan; pembuat bukan pemeriksa |
| WD-02 | Templat surat penunjukan | `docs/kemitraan/WD-02-templat-surat-penunjukan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/pejabat berwenang | Bukan surat kuasa; daftar tegas kewenangan yang tidak diberikan |
| WD-04 | SOP pemasaran lokal dan koordinasi pusat | `docs/kemitraan/WD-04-sop-pemasaran-lokal-dan-koordinasi-pusat.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) operasional/pemasaran | Alur prospek lewat RF-02; larangan merujuk UM-07 |
| WD-06 | Kebijakan biaya operasional dan insentif wilayah | `docs/kemitraan/WD-06-kebijakan-biaya-operasional-dan-insentif-wilayah.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) keuangan/pemilik program | Persetujuan sebelum pengeluaran; larangan biaya untuk pihak instansi |
| UM-12 | Ketentuan umum kemitraan | `docs/kemitraan/UM-12-ketentuan-umum-kemitraan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/legal | Mencegah pertentangan antar-perjanjian skema; ada pembagian muatan |
| UM-13 | Evaluasi, perpanjangan, penangguhan, pengakhiran | `docs/kemitraan/UM-13-evaluasi-perpanjangan-penangguhan-pengakhiran.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/operasional | Ada diagram siklus; hak menanggapi sebelum keputusan |
| OP-01 | Checklist onboarding mitra | `docs/kemitraan/OP-01-checklist-onboarding-mitra.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin kemitraan | Tidak boleh beraktivitas sebelum bagian A dan B selesai |
| OP-02 | Daftar kontak, jalur eskalasi, dan SLA | `docs/kemitraan/OP-02-kontak-jalur-eskalasi-dan-sla.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) pemilik program/admin | Nama dan SLA kosong; pelanggaran berat langsung ke direksi |
| OP-03 | Register perjanjian aktif | `docs/kemitraan/OP-03-register-perjanjian-aktif.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin dokumen/legal | Beda dari UM-14: mencatat perjanjian yang sudah ditandatangani |
| CB-01 | Brief kajian hukum model cabang resmi | `docs/kemitraan/CB-01-brief-kajian-hukum-model-cabang-resmi.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/legal | Model: pihak lokal mandiri berlisensi; indikasi waralaba; 10 pertanyaan hukum dan 4 pajak |
| KL-02 | Templat SOW/KAK per proyek | `docs/kemitraan/KL-02-templat-sow-kak-per-proyek.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) manajer proyek/teknis | Kriteria penerimaan tidak boleh berupa terbitnya SLF/PBG |
| KL-04 | Templat penawaran, anggaran, termin | `docs/kemitraan/KL-04-templat-penawaran-anggaran-termin.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) penjualan/keuangan | Nilai kosong; biaya resmi instansi dipisah; bagian internal terpisah |
| KL-06 | SOP pengendalian mutu deliverable | `docs/kemitraan/KL-06-sop-pengendalian-mutu-deliverable.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) penanggung jawab teknis/mutu | Lima titik pemeriksaan; pembuat bukan pemeriksa |
| WD-02 | Templat surat penunjukan | `docs/kemitraan/WD-02-templat-surat-penunjukan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/pejabat berwenang | Bukan surat kuasa; daftar tegas kewenangan yang tidak diberikan |
| WD-04 | SOP pemasaran lokal dan koordinasi pusat | `docs/kemitraan/WD-04-sop-pemasaran-lokal-dan-koordinasi-pusat.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) operasional/pemasaran | Alur prospek lewat RF-02; larangan merujuk UM-07 |
| WD-06 | Kebijakan biaya operasional dan insentif wilayah | `docs/kemitraan/WD-06-kebijakan-biaya-operasional-dan-insentif-wilayah.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) keuangan/pemilik program | Persetujuan sebelum pengeluaran; larangan biaya untuk pihak instansi |
| UM-12 | Ketentuan umum kemitraan | `docs/kemitraan/UM-12-ketentuan-umum-kemitraan.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/legal | Mencegah pertentangan antar-perjanjian skema; ada pembagian muatan |
| UM-13 | Evaluasi, perpanjangan, penangguhan, pengakhiran | `docs/kemitraan/UM-13-evaluasi-perpanjangan-penangguhan-pengakhiran.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pemilik program/operasional | Ada diagram siklus; hak menanggapi sebelum keputusan |
| OP-01 | Checklist onboarding mitra | `docs/kemitraan/OP-01-checklist-onboarding-mitra.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin kemitraan | Tidak boleh beraktivitas sebelum bagian A dan B selesai |
| OP-02 | Daftar kontak, jalur eskalasi, dan SLA | `docs/kemitraan/OP-02-kontak-jalur-eskalasi-dan-sla.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) pemilik program/admin | Nama dan SLA kosong; pelanggaran berat langsung ke direksi |
| OP-03 | Register perjanjian aktif | `docs/kemitraan/OP-03-register-perjanjian-aktif.md` | 0.1 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) admin dokumen/legal | Beda dari UM-14: mencatat perjanjian yang sudah ditandatangani |
| CB-01 | Brief kajian hukum model cabang resmi | `docs/kemitraan/CB-01-brief-kajian-hukum-model-cabang-resmi.md` | 0.1 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/legal | Model: pihak lokal mandiri berlisensi; indikasi waralaba; 10 pertanyaan hukum dan 4 pajak |

| CB-01 (rev) | Brief kajian hukum model cabang resmi | `docs/kemitraan/CB-01-brief-kajian-hukum-model-cabang-resmi.md` | 0.2 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) direksi/legal | Tambah jawaban pemilik program; opsi A asumsi kerja; pertanyaan 11-14 |
| UM-11 (rev) | Kebijakan imbalan komisi dan biaya | `docs/kemitraan/UM-11-kebijakan-imbalan-komisi-dan-biaya.md` | 0.2 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pimpinan/keuangan | Tambah arus lisensi cabang (10 persen, setup mulai Rp50 juta) |
| UM-11 (rev) | Kebijakan imbalan komisi dan biaya | `docs/kemitraan/UM-11-kebijakan-imbalan-komisi-dan-biaya.md` | 0.2 (draf) | 2026-10-26 | Perlu tinjauan hukum | (usulan) pimpinan/keuangan | Tambah arus lisensi cabang (10 persen, setup mulai Rp50 juta) |
| UM-01 (rev) | Profil perusahaan dan portofolio | `docs/kemitraan/UM-01-profil-perusahaan-dan-portofolio.md` | 0.2 (draf) | 2026-10-26 | Perlu persetujuan internal | (usulan) pimpinan/pemasaran | Catat merek terdaftar atas nama Zof Engineering; perlu verifikasi |

| 00-A (rev) | Brief topik kesiapan dokumen | `docs/kemitraan/00-brief-topik-dokumen-kemitraan.md` | 0.2 (draf) | 2026-10-26 | Perlu persetujuan internal | Belum ditetapkan | Koreksi rujukan: PP 35/2024 mencabut PP 42/2007 |
