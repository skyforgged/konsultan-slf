# UM-04 Formulir Pendaftaran Minat Mitra

| Atribut | Isi |
|---|---|
| ID matriks | UM-04 (UMUM, P0) |
| Versi | 0.2 (draf) |
| Tanggal draf | 2026-10-25 |
| Pemilik | Belum ditetapkan (usulan: administrasi program) |
| Status | Perlu tinjauan hukum |

> Draf kerja. Redaksi persetujuan data pribadi wajib ditinjau konsultan hukum terhadap UU No. 27 Tahun 2022 sebelum dipakai. Roadmap menyebut formulir minat sebagai bagian fondasi; saat ini kanal masuk masih WhatsApp, sehingga bagian 4 menyediakan padanannya.

## 1. Prinsip

Kumpulkan data seminimal mungkin pada tahap minat. Dokumen identitas, NPWP, rekening, dan dokumen legal tidak diminta sebelum tahap verifikasi dan kesepakatan.

## 2. Kolom formulir

| Kolom | Wajib | Tujuan | Catatan |
|---|---|---|---|
| Nama lengkap | Ya | Menghubungi dan mengidentifikasi | |
| Nama organisasi (bila ada) | Tidak | Konteks | |
| Nomor kontak dan email | Ya (salah satu minimal) | Tindak lanjut | |
| Kota atau wilayah yang diminati | Ya | Pemetaan wilayah | |
| Skema yang diminati | Ya | Pengarahan awal | Pilihan: Referral, Mitra Kolaboratif, Perwakilan Daerah, Cabang Resmi, Belum tahu |
| Latar belakang dan pengalaman relevan | Tidak | Kualifikasi awal | Teks bebas singkat |
| Jaringan atau jenis klien yang dijangkau | Tidak | Kualifikasi awal | |
| Bagaimana mengetahui program ini | Tidak | Sumber prospek untuk pengukuran | |
| Persetujuan dihubungi dan data diproses | Ya | Dasar pemrosesan | Teks pada bagian 3 |

Tidak diminta pada tahap ini: KTP, NPWP, rekening bank, foto, data keluarga, data lokasi presisi.

## 3. Teks persetujuan (draf untuk ditinjau hukum)

"Saya setuju PT Zof Engineering Indonesia menyimpan dan memakai data yang saya isi untuk menghubungi saya terkait program kemitraan, menilai kesesuaian skema, dan mencatat sumber prospek. Data tidak dibagikan kepada pihak lain di luar tim yang menangani program ini, kecuali dengan persetujuan saya atau bila diwajibkan peraturan. Saya dapat meminta akses, perbaikan, atau penghapusan data melalui [DIISI PEMILIK: kontak resmi]. Rincian ada pada kebijakan data kami."

Catatan: tautan ke kebijakan data (UM-09) harus aktif sebelum formulir dipublikasikan.

## 4. Padanan untuk WhatsApp

Pesan pembuka yang meminta data terstruktur:

"Halo, saya tertarik dengan program kemitraan. Nama: ... Kota: ... Skema yang diminati: ... Pengalaman singkat: ... Saya setuju data ini dipakai untuk menghubungi saya terkait program."

Aturan: balasan pertama tim mengingatkan bahwa data dipakai hanya untuk tindak lanjut program dan menyebut cara meminta penghapusan.

## 5. Setelah formulir terkirim

- Catat ke daftar prospek dengan status Baru (UM-06).
- Respons sesuai SLA yang diputuskan pada UM-06.
- Jangan menjanjikan penerimaan sebagai mitra pada balasan pertama.

## 6. Pengujian sebelum dipakai

| Pemeriksaan | Hasil |
|---|---|
| Formulir terkirim dan tercatat | [DIUJI PEMILIK] |
| Tautan kebijakan data aktif | [DIUJI PEMILIK] |
| Hanya orang berwenang yang dapat melihat data | [DIUJI PEMILIK] |
| Sumber prospek tercatat | [DIUJI PEMILIK] |

## 7. Pembaruan 0.2: perbandingan dengan formulir yang sudah ada di situs

Per 2026-10-26 situs memuat formulir multi-langkah (`/kemitraan/form-proposal/`) dan halaman pengantar `/kemitraan/pendaftaran/`. Rancangan field-nya ada di `docs/form-pendaftaran-mitra.md`. Perbandingan dengan dokumen ini:

| Field di situs | Penilaian terhadap UM-04 | Saran |
|---|---|---|
| Nama, email, WhatsApp, domisili | Sesuai prinsip minimal. Email dan WhatsApp keduanya wajib, lebih ketat dari usulan "salah satu". | Diterima; pertimbangkan hanya satu yang wajib |
| Profesi, perusahaan | Sesuai, opsional | Diterima |
| Skema, wilayah | Sesuai | Diterima |
| Pengalaman, target mulai, alasan, jaringan | Sesuai untuk kualifikasi awal | Diterima; beri batas panjang teks |
| Bersedia mengikuti SOP dan pelatihan | Menyiratkan SOP dan pelatihan ada; keduanya belum ada (UM-02 bagian 3) | Ubah menjadi "bersedia mengikuti pedoman perusahaan" |
| Bersedia menanggung biaya awal (lisensi atau operasional) | Tidak ada keputusan biaya (UM-11 bagian 7) dan istilah lisensi menyentuh risiko waralaba (R-05) | Tunda atau hapus sampai keputusan biaya dan CB-01 selesai |
| Persetujuan data | Merujuk kebijakan privasi yang tidak ditemukan di repo | Jangan aktifkan sebelum UM-09 dipublikasikan sebagai halaman |
| Persetujuan kontak dan info program | Dua tujuan berbeda, sudah dipisah | Pastikan tidak tercentang otomatis |

### Hal yang menghalangi penggunaan formulir sebagai kanal pendaftaran

1. **Data tidak dikirim.** Formulir di situs adalah simulasi: data hanya ditampilkan kembali dan tidak sampai ke tim. Sementara halaman pengantar menyatakan tim akan menghubungi pengisi lewat WhatsApp atau email. Pengisi bisa mengira sudah mendaftar.
2. **Kebijakan privasi tidak ada.** Halaman pengantar meminta pengunjung membaca kebijakan privasi sebelum menyetujui; tidak ditemukan halaman tersebut di repo.
3. **Pernyataan "tidak membagikan data kepada pihak ketiga"** perlu disesuaikan bila nanti memakai layanan penerima formulir pihak ketiga, karena layanan itu ikut memproses data.
4. **Rancangan awal menyebut Tally**, sedangkan referensi Tally sudah dihapus dari situs; tentukan satu mekanisme dan perbarui dokumen rancangan.

### Keputusan yang dibutuhkan

[KEPUTUSAN] mekanisme penerimaan data (layanan formulir atau surel khusus), pemilik data, kontak penghapusan, dan apakah halaman pendaftaran tetap terbit sampai mekanisme siap.
