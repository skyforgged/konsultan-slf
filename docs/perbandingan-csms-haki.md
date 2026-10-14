| Aspek | `jasa-perijinan-haki` | `jasa-perijinan-csms` | Keputusan untuk proyek SLF |
|---|---|---|---|
| Pendekatan konten | Markdown dan frontmatter mengendalikan konten serta susunan block artikel | Markdown dengan `contentBlocks` yang menggunakan tipe dan data block | Gabungkan fleksibilitas frontmatter HAKI dengan model block CSMS yang terstruktur |
| Struktur komponen | Dipisahkan ke dalam direktori `pages`, `home`, `shared`, dan `content` | Komponen block terkonsentrasi di direktori `blocks`, bersama komponen utama situs | Gunakan struktur yang jelas berdasarkan fungsi, tanpa membuat direktori terlalu rumit |
| Variasi komponen | Lebih ringkas, mencakup card, FAQ, CTA, tabel, note, steps, stats, glossary, dan quote | Lebih banyak variasi, mencakup block artikel, layanan, checklist, timeline, serta komponen khusus halaman | Jadikan CSMS sebagai sumber inventaris komponen awal |
| Pengaturan tampilan block | Mendukung pengaturan kelas tertentu melalui frontmatter, dengan kelas bawaan komponen | Menggunakan tipe block dan properti `data` yang ditentukan skema | Pertahankan pengaturan tampilan terkontrol, bukan membebaskan setiap artikel dari konsistensi desain |
| Penyusunan heading | Heading block dapat masuk ke daftar isi secara otomatis | Daftar isi dibentuk dari tipe block tertentu, termasuk section dan struktur artikel | Gabungkan agar heading tetap eksplisit dan daftar isi dibuat otomatis |
| Artikel panjang | Block dapat disusun melalui frontmatter; mendukung komposisi konten yang fleksibel | Memiliki `article-body` dengan section dan subsection, TOC, serta sidebar | Gunakan struktur artikel CSMS, dengan kemampuan mengatur urutan block seperti HAKI |
| Sidebar artikel | Pendekatan komponen dan komposisi konten mendukung pengembangan sidebar | Sudah memiliki rancangan TOC, sidebar sticky, layanan terkait, dan penulis | Jadikan sidebar CSMS sebagai dasar, lalu uji perilakunya pada artikel panjang |
| CTA | CTA WhatsApp dapat ditempatkan pada posisi block dalam artikel | CTA layanan dapat disisipkan di tengah artikel dan diarahkan ke layanan terkait | Gabungkan CTA WhatsApp dan CTA menuju halaman layanan |
| Relasi konten | Memiliki `relatedType` dan `relatedId`, serta pola parent–child untuk konten | Memiliki relasi artikel ke layanan melalui `relatedService` dan algoritma artikel terkait | Gunakan relasi konten eksplisit agar halaman layanan dan artikel saling mendukung |
| Identitas konten | Mendukung `id` numerik dan `ulid` | Mendukung `ulid` dan identitas artikel yang terstruktur | Pertahankan identitas yang konsisten dan tervalidasi |
| Pengembangan komponen | Menambahkan block memerlukan komponen, registry, dan schema | Menambahkan block memerlukan komponen, schema, dan registrasi renderer | Standarkan proses penambahan komponen sejak awal |

| Kelompok | Komponen yang direkomendasikan | Sumber utama |
|---|---|---|
| Konten dasar | Paragraf, daftar, gambar, card, note, quote | HAKI + CSMS |
| Struktur artikel | Article lead, section header, article body | CSMS dengan pola komposisi HAKI |
| Dokumen dan persyaratan | Document list, checklist card, requirement checklist | CSMS |
| Informasi terstruktur | Comparison table, stats, glossary | HAKI + CSMS |
| Prosedur | Steps, numbered steps, process timeline | HAKI + CSMS |
| Interaksi | FAQ, CTA WhatsApp, CTA layanan | HAKI + CSMS |
| Halaman layanan | Service detail, service card grid, service directory | CSMS |
| Navigasi konten | Related articles, latest articles, breadcrumb | HAKI + CSMS |
| Artikel panjang | Article header, TOC, sidebar, author, related service | CSMS |
| Beranda | Hero, ringkasan layanan, artikel terbaru, CTA | CSMS dengan struktur halaman HAKI |
