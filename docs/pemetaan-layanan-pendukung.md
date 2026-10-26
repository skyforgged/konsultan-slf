# Pemetaan Layanan Pendukung

Tujuan kita bukan membuat katalog layanan baru, melainkan menentukan layanan pendukung mana yang menjadi bagian dari setiap layanan utama, sehingga halaman layanan utama yang sudah dibuat dapat diterbitkan dengan struktur layanan yang lengkap.

Prinsip pemetaannya: satu layanan pendukung boleh berelasi dengan beberapa layanan utama jika memang relevan, tetapi harus ada layanan utama induk yang paling tepat agar tidak terjadi pengelompokan yang membingungkan.

## 1. Pemetaan layanan pendukung ke layanan utama

Berdasarkan enam halaman layanan yang ada di repositori saat ini, berikut pemetaan awal yang saya sarankan.

| No. | Layanan pendukung                               | Layanan utama induk yang disarankan                                                                                               |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Pengurusan Sertifikat Laik Fungsi (SLF)         | Pendampingan Sertifikat Laik Fungsi (SLF)                                                                                         |
| 2   | Pengurusan Persetujuan Bangunan Gedung (PBG)    | Pengurusan PBG                                                                                                                    |
| 3   | Pembuatan NIB dan PKKPR OSS RBA                 | Pengurusan PBG, jika dibutuhkan dalam konteks perizinan bangunan; dapat pula mendukung kebutuhan usaha                            |
| 4   | Dokumen lingkungan (SPPL/UKL-UPL/RKL-RPL/AMDAL) | Pengurusan PBG, jika menjadi bagian dari persiapan perizinan proyek                                                               |
| 5   | Pengurusan dokumen Andalalin                    | Pengurusan PBG, jika terkait persyaratan proyek; dapat juga menjadi kebutuhan tersendiri                                          |
| 6   | Pembuatan siteplan dan pengurusan pengesahannya | Pengurusan PBG                                                                                                                    |
| 7   | Pengurusan IRK/ITR/SKRK/KRK/PKKPR non-berusaha  | Pengurusan PBG                                                                                                                    |
| 8   | Pengurusan dokumen peil banjir                  | Pengurusan PBG atau Pengkajian Teknis Bangunan, sesuai kebutuhan proyek                                                           |
| 9   | Pengurusan dokumen terkait Damkar               | Pendampingan SLF atau Pengkajian Teknis Bangunan                                                                                  |
| 10  | Pengurusan SLO listrik dan genset               | Pendampingan SLF atau Pengkajian Teknis Bangunan                                                                                  |
| 11  | Pemetaan dan pengukuran peta bidang tanah       | Pengurusan PBG, sebagai pendukung data lahan                                                                                      |
| 12  | Sondir/soil test                                | Pengurusan PBG, sebagai data teknis perencanaan                                                                                   |
| 13  | Pengurusan izin lift (K3)                       | Pendampingan SLF atau Pengkajian Teknis Bangunan                                                                                  |
| 14  | Pengurusan sumur bor dan SIPA                   | Pengurusan PBG, apabila berkaitan dengan kebutuhan proyek                                                                         |
| 15  | Pengurusan izin terkait pengelolaan limbah      | Pengurusan PBG, jika terkait proyek; atau kebutuhan perizinan usaha                                                               |
| 16  | Pembuatan DED/as-built drawing (2D dan 3D)      | As-Built Drawing untuk dokumen kondisi terbangun; Pengurusan PBG untuk gambar rencana                                             |
| 17  | Pembuatan spesifikasi teknis dan RKS            | Pengurusan PBG                                                                                                                    |
| 18  | Pengurusan izin KKOP                            | Pengurusan PBG, untuk bangunan yang berada di kawasan terkait                                                                     |
| 19  | Pengukuran lahan dan pemetaan                   | Pengurusan PBG                                                                                                                    |
| 20  | Analisis struktur bangunan                      | Pengkajian Teknis Bangunan                                                                                                        |
| 21  | Analisis hidrologi untuk bangunan air           | Pengkajian Teknis Bangunan, jika relevan dengan objek kajian                                                                      |
| 22  | Pengurusan SS, SINAS, IUI                       | Belum memiliki induk yang benar-benar tepat di enam halaman layanan saat ini; lebih sesuai dengan rumpun perizinan usaha/industri |

## 2. Relasi silang yang perlu dipertahankan

Ada beberapa layanan pendukung yang sebaiknya terhubung ke lebih dari satu layanan utama. Ini bukan berarti harus dibuatkan halaman baru untuk setiap relasi.

| Layanan pendukung      | Induk utama                | Induk terkait                                                         |
| ---------------------- | -------------------------- | --------------------------------------------------------------------- |
| As-built drawing       | As-Built Drawing           | SLF Bangunan Eksisting, Pengkajian Teknis Bangunan                    |
| Analisis struktur      | Pengkajian Teknis Bangunan | SLF Bangunan Eksisting, Pendampingan SLF                              |
| Dokumen Damkar         | Pendampingan SLF           | SLF Bangunan Eksisting, Pengkajian Teknis Bangunan                    |
| SLO listrik dan genset | Pendampingan SLF           | SLF Bangunan Eksisting, Pengkajian Teknis Bangunan                    |
| DED dan gambar rencana | Pengurusan PBG             | As-Built Drawing, jika diperlukan sebagai pembanding kondisi bangunan |
| Siteplan               | Pengurusan PBG             | Pendampingan SLF, jika dibutuhkan untuk dokumentasi bangunan          |
| Peil banjir            | Pengurusan PBG             | Pengkajian Teknis Bangunan, sesuai ruang lingkup kajian               |
| Dokumen lingkungan     | Pengurusan PBG             | Perizinan usaha, sesuai kebutuhan kegiatan                            |

Catatan penting: Perpanjangan SLF bukan induk utama untuk layanan teknis tertentu, melainkan jalur layanan berdasarkan kebutuhan perpanjangan sertifikat. Layanan pendukungnya mengikuti kebutuhan pemeriksaan dan dokumen bangunan pada kasus tersebut.

## 3. Layanan yang belum mempunyai induk yang ideal

Dari daftar tersebut, saya melihat tiga rumpun yang tidak sebaiknya dipaksakan masuk sepenuhnya ke halaman PBG atau SLF:

- Perizinan usaha dan industri: NIB, PKKPR OSS RBA, SS, SINAS, IUI.
- Perizinan lingkungan: SPPL, UKL-UPL, RKL-RPL, AMDAL, serta izin pengelolaan limbah.
- Survei dan perizinan teknis khusus: sondir, SIPA, pengukuran lahan, KKOP, Andalalin, dan analisis hidrologi.

Untuk tahap penerbitan sekarang, layanan tersebut tetap dapat dicantumkan sebagai layanan pendukung pada halaman induk yang paling relevan. Namun, jangan menyatakan bahwa semuanya merupakan persyaratan wajib SLF atau PBG. Kebutuhannya bergantung pada jenis bangunan, lokasi, kegiatan usaha, dan ketentuan yang berlaku.

## 4. Rekomendasi akhir untuk persiapan penerbitan

Disarankan struktur berikut:

- Pendampingan SLF: dokumen Damkar, SLO listrik/genset, izin lift, dan dokumen teknis pendukung pemeriksaan.
- SLF Bangunan Eksisting: as-built drawing, analisis struktur, dokumen utilitas, dan dokumen pemeriksaan bangunan.
- Perpanjangan SLF: dokumen pemeriksaan dan pendukung sesuai kondisi bangunan serta kebutuhan perpanjangan.
- Pengkajian Teknis Bangunan: analisis struktur, as-built drawing, dan kajian teknis terkait.
- Pengurusan PBG: DED, siteplan, RKS, sondir, pengukuran lahan, serta dokumen tata ruang dan teknis lain sesuai kebutuhan.
- As-Built Drawing: pembuatan gambar kondisi bangunan terbangun, termasuk kebutuhan 2D dan 3D.

Untuk layanan usaha, lingkungan, dan perizinan khusus, hubungkan ke halaman SLF/PBG hanya ketika konteksnya relevan.

Dengan demikian, enam halaman layanan utama tetap menjadi fondasi penerbitan, sedangkan layanan pendukung memperjelas cakupan pekerjaan, membantu pengunjung menemukan solusi terkait, dan memperkuat tautan internal. Tidak perlu menunggu seluruh layanan pendukung memiliki halaman mandiri sebelum menerbitkan layanan utama.
