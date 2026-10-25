# Desain Form Pendaftaran Mitra (Tally.so)

Dokumen ini menyimpan rancangan field form pendaftaran awal mitra untuk program
kemitraan SLF/PBG. Form ini digunakan untuk mengukur minat calon mitra pada
empat skema: Referral, Mitra Kolaboratif, Perwakilan Daerah, dan Cabang Resmi.

## A. Identitas (wajib)
1. Nama lengkap (text, wajib)
2. Email (email, wajib)
3. Nomor WhatsApp (phone, wajib)
4. Kota/Provinsi domisili (text/dropdown, wajib)
5. Profesi/pekerjaan saat ini (text, opsional)
6. Perusahaan/organisasi (text, opsional)

## B. Minat kemitraan (wajib)
7. Skema yang diminati (checkbox, pilih satu/lebih)
   - Referral
   - Mitra Kolaboratif
   - Perwakilan Daerah
   - Cabang Resmi
   - Belum yakin / ingin konsultasi dulu
8. Wilayah yang ingin dilayani/dikembangkan (text, wajib)

## C. Konteks & kapasitas (opsional tapi berguna)
9. Alasan tertarik menjadi mitra (textarea, wajib singkat)
10. Apakah memiliki jaringan ke pemilik bangunan/pengembang? (ya/tidak + detail)
11. Pengalaman di bidang SLF/PBG/perizinan (pilihan: belum ada / dasar / menengah / berpengalaman)
12. Target waktu mulai (pilihan: segera / 1–3 bulan / 3–6 bulan / belum tahu)

## D. Kesiapan (relevan terutama Cabang Resmi)
13. Bersedia mengikuti SOP & pelatihan? (ya/tidak/belum tahu)
14. Bersedia menanggung biaya awal (lisensi/operasional)? (ya/tidak/belum tahu)
15. Dukungan yang diharapkan dari perusahaan (checkbox, multi)
    - Pelatihan
    - Materi marketing
    - SOP & template
    - Pendampingan teknis
    - Penggunaan merek resmi
    - Lainnya

## E. Persetujuan (wajib)
16. Persetujuan pengumpulan & penggunaan data (checkbox wajib) — link ke kebijakan privasi
17. Bersedia dihubungi via WhatsApp/email (checkbox wajib)
18. Bersedia menerima info/update program mitra (checkbox opsional)

## F. Tracking (hidden, otomatis)
- Sumber/UTM (hidden)
- Halaman asal (hidden)
- Tanggal submit (otomatis Tally)

## Tips implementasi di Tally
- Gunakan logic branching: tampilkan field D hanya jika skema "Cabang Resmi" dipilih.
- Aktifkan email notification ke tim + webhook ke Google Sheets/Notion.
- Tambahkan honeypot (anti-spam bawaan Tally) dan (opsional) Cloudflare Turnstile.
- Set redirect/thank-you page ke halaman konfirmasi di situs.
- Export CSV berkala untuk analisis peminat per skema & wilayah.
