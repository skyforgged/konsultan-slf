# OP-03 Register Perjanjian Aktif, Tanggal Berakhir, dan Kewajiban yang Ditinjau

| Atribut | Isi |
|---|---|
| ID matriks | OP-03 (UMUM, P1) |
| Versi | 0.1 (draf) |
| Tanggal draf | 2026-10-26 |
| Pemilik | Belum ditetapkan (usulan: admin dokumen dan legal) |
| Status | Perlu persetujuan internal |

> Draf kerja. Berbeda dengan UM-14 yang mencatat **dokumen kebijakan dan templat**, OP-03 mencatat **perjanjian yang sudah ditandatangani** dengan mitra. Hanya perjanjian aktif yang masuk. Jangan memuat nomor identitas atau rekening; simpan di sistem terpisah sesuai UM-09 dan rujuk lewat nomor.

## 1. Kolom register

| Kolom | Isi |
|---|---|
| No. register | Urut atau kode skema dan tahun |
| Mitra dan skema | Nama; Referral / Kolaboratif / Perwakilan / Cabang |
| Dokumen | Perjanjian skema, versi UM-12, lampiran dan versinya |
| Tanggal tanda tangan dan berlaku | |
| Tanggal berakhir | Dan apakah perpanjangan otomatis atau tidak |
| Penanda tangan perusahaan | Pejabat berwenang |
| Wilayah dan eksklusivitas | Sesuai WD-02, bila ada |
| Kewajiban yang dipantau | Lihat bagian 2 |
| Tanggal tinjau berikutnya | |
| Status | Aktif / Ditangguhkan / Berakhir / Dalam perpanjangan |
| Lokasi arsip | Folder atau sistem penyimpanan asli |

## 2. Kewajiban yang perlu ditinjau berkala

| Kewajiban | Sumber | Pemantauan |
|---|---|---|
| Masa berlaku perjanjian dan surat penunjukan | WD-02, perjanjian skema | Peringatan [KEPUTUSAN] hari sebelum berakhir |
| Masa berlaku bukti kompetensi personel kunci | KL-05 | Peringatan sebelum kedaluwarsa |
| Masa perlindungan pengenalan lead | RF-03 | Per lead |
| Laporan aktivitas | WD-07 (belum disusun) | Per periode |
| Evaluasi berkala | UM-13 | Sesuai jadwal |
| Kerahasiaan yang berlanjut setelah berakhir | UM-10 | Catat tanggal akhir |
| Komisi atau insentif terutang | UM-11, RF-04, WD-06 | Setiap pembayaran |
| Penurunan materi dan akun saat berakhir | UM-08, UM-13 | Saat berakhir |
| Perubahan matriks otorisasi | WD-05 | Setiap perubahan |

## 3. Prosedur

1. Setiap perjanjian yang ditandatangani dicatat paling lambat [KEPUTUSAN] hari kerja.
2. Admin meninjau register tiap bulan dan mengirim daftar yang jatuh tempo kepada pemilik program.
3. Perubahan, perpanjangan, dan pengakhiran dicatat dengan tanggal dan dasarnya.
4. Perjanjian yang berakhir dipindahkan ke arsip, tidak dihapus dari riwayat.
5. Akses ke register dibatasi (UM-09).

## 4. Contoh baris (format)

| No. | Mitra | Skema | Dokumen | Berlaku | Berakhir | Tinjau | Status | Arsip |
|---|---|---|---|---|---|---|---|---|
| [DIISI] | [DIISI] | [DIISI] | [DIISI] | | | | Aktif | [DIISI] |

## 5. Pemeriksaan kualitas

- Setiap baris menunjuk dokumen yang benar-benar tersimpan; tanpa arsip, baris dianggap tidak sah.
- Tidak ada perjanjian aktif dengan lampiran yang belum berstatus disetujui.
- Tidak ada penanda tangan perusahaan yang tidak berwenang.
