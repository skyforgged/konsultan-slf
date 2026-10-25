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
