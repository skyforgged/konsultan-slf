# Brief Topik: Kesiapan Dokumen Program Kemitraan SLF/PBG

| Atribut | Isi |
|---|---|
| Jenis | Topic brief (metode skill `brief`, mode `topic`) |
| Tanggal | 2026-10-25 |
| Dasar | `docs/matriks-induk-dokumen-kemitraan.md`, `docs/persiapan-dokumen-skema-kemitraan.md` |
| Status | Draf kerja untuk pemilik program. Bukan nasihat hukum; perlu ditinjau konsultan hukum sebelum dijadikan dasar keputusan. |

## Ringkasan

Program kemitraan empat skema (Referral, Mitra Kolaboratif, Perwakilan Daerah, Cabang Resmi) sudah tampil publik pada `/kemitraan/` dan empat subhalamannya, serta didukung roadmap akuisisi mitra. Namun seluruh 50 dokumen pada matriks induk masih berstatus belum disusun atau belum diinventarisasi. Artinya pernyataan publik sudah berjalan lebih cepat daripada dokumen yang mendukungnya. Prioritas langsung adalah 11 dokumen P0 (fondasi), dimulai dengan inventarisasi, sebelum skema apa pun menerima mitra secara resmi.

## Latar belakang

- Matriks induk memuat 50 dokumen: 20 lintas skema, 6 Referral, 8 Mitra Kolaboratif, 7 Perwakilan Daerah, 9 Cabang Resmi. Prioritas: P0 sebanyak 11, P1 sebanyak 23, P2 sebanyak 7, P3 sebanyak 9.
- 32 dari 50 dokumen ditandai perlu tinjauan hukum.
- Roadmap kemitraan menetapkan tiga jalur ekspansi (satu situs, 3 sampai 4 situs, portofolio situs plus profil pendukung) dan menekankan validasi sebelum ekspansi, satu sumber kebenaran, serta larangan menjanjikan hasil yang belum terbukti.
- Rancangan halaman (bagian 16) menetapkan bahwa setiap janji publik harus sesuai kemampuan operasional yang benar-benar siap, dan menyediakan gerbang kesiapan publikasi.

## Kondisi saat ini

| Aspek | Kondisi berdasarkan berkas repo |
|---|---|
| Halaman publik | 5 halaman terbit (`draft: false`): induk dan 4 skema. Menyatakan bahwa ketentuan final ditetapkan dalam kesepakatan tertulis. |
| Dokumen internal | Belum ada satu pun dokumen matriks yang tercatat selesai. Yang ada hanya rancangan, roadmap, catatan persiapan, dan matriks. |
| Identitas perusahaan | `src/config/site.ts` memuat nama badan usaha, alamat, dan kontak WhatsApp. Belum ada profil dan portofolio yang disetujui untuk publikasi. |
| Penanganan prospek | Kontak lewat WhatsApp dengan pesan terisi dari situs. Belum ada formulir terstruktur, SOP, atau kebijakan data. |
| Penanggung jawab | Belum ditetapkan (matriks bagian 5). |

## Pertimbangan utama

1. **Kesenjangan klaim publik dan kesiapan.** Beberapa halaman menyebut pedoman komunikasi, etika promosi, penggunaan merek, SOP, dan pelaporan lead sebagai dukungan, sementara dokumennya (UM-07, UM-08, UM-06, WD-07) belum ada. Halaman induk juga menyebut perkiraan waktu seleksi 2 sampai 4 minggu, padahal kriteria dan waktu evaluasi mitra masih keputusan internal yang terbuka.
2. **Batas kewenangan adalah risiko utama.** Dalam layanan SLF/PBG, status kemitraan tidak otomatis memberi kompetensi atau kewenangan melakukan kajian teknis, menandatangani dokumen teknis, atau mewakili badan usaha. Dokumen harus memisahkan pencari prospek, mitra proyek, perwakilan, dan cabang.
3. **Data pribadi.** Pengumpulan data calon mitra dan klien tunduk pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (diundangkan 17 Oktober 2022). Peraturan pelaksana dan rencana perubahan undang-undang (masuk Prolegnas Prioritas 2026 menurut sumber yang diperiksa) perlu dicek statusnya saat dokumen difinalkan.
4. **Cabang Resmi dapat memicu rezim waralaba.** Bila cabang menerima hak penggunaan merek dan sistem bisnis dengan imbalan, konsultan hukum perlu menilai apakah skema itu masuk kategori waralaba (PP 42/2007, Permendag 71/2019, PP 35/2024; terdapat kewajiban pendaftaran STPW). Penilaian ini belum dilakukan dan merupakan inti CB-01.
5. **Imbalan dan pajak.** Dasar komisi, atribusi lead, dan perlakuan pajak belum ditetapkan. Sengketa komisi adalah risiko yang paling mungkin terjadi lebih awal.
6. **Strategi portofolio situs.** Roadmap membuka kemungkinan situs sister company dan banyak profil. Hubungan afiliasi harus transparan, dan pedoman merek (UM-08) perlu mengaturnya agar tidak menyesatkan pengguna.

## Preseden internal

- Rancangan halaman bagian 16.3 sampai 16.8: perbandingan skema, kebijakan kompensasi dan lead, persyaratan minimum, serta batas klaim. Dipakai sebagai dasar isi UM-03, UM-05, UM-11.
- Roadmap bagian 7: status prospek (Baru sampai Aktif) dan data minimum yang dicatat. Dipakai sebagai dasar UM-06.
- Roadmap bagian 6: definisi funnel dan KPI. Dipakai sebagai dasar UM-15 (belum dikerjakan).
- Catatan persiapan: tiga lapisan dokumen (bersama, khusus skema, operasional).

## Kesenjangan

- Tidak ada sumber email, kalender, chat, CLM, atau CRM yang terhubung; brief ini hanya memakai berkas repo.
- Dokumen yang mungkin sudah ada di luar repo (profil perusahaan, perjanjian lama, templat) tidak terperiksa. Inventarisasi (langkah 1 matriks) harus dilakukan oleh pemilik program.
- Rujukan hukum diverifikasi sebatas judul dan keberlakuan umum. Isi pasal, status terbaru peraturan pelaksana, serta ketentuan kompetensi dan perpajakan belum ditelaah.
- Fakta perusahaan (struktur, pejabat berwenang, legalitas usaha, kepemilikan merek) tidak tersedia kecuali yang tercantum di `site.ts`.

## Langkah berikut yang disarankan

1. Tetapkan penanggung jawab program dan pejabat yang berwenang menyetujui dokumen (matriks bagian 5, poin 1 dan 2).
2. Inventarisasi dokumen yang sudah ada di luar repo dan masukkan ke register (UM-14).
3. Susun dokumen P0 dalam urutan matriks; jangan promosikan program sebagai siap menerima mitra sebelum P0 selesai dan disetujui.
4. Koreksi tiga klaim halaman publik (dukungan yang belum tersedia, janji 2 sampai 4 minggu, larangan tanda tangan perwakilan yang belum selaras dengan WD-05).
5. Ajukan CB-01 dan tinjauan UU PDP kepada konsultan hukum sebelum skema Cabang Resmi atau pengumpulan data skala besar dijalankan.
