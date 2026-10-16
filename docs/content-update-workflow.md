# Workflow Update Content — Panduan Operasional Agent

Dokumen ini menjelaskan bagaimana Agent menjalankan satu siklus update content. Kebijakan editorial yang menjadi sumber aturan adalah `docs/content-update-policy.md`; bila ada konflik instruksi, kebijakan tersebut dan schema/implementasi proyek harus diikuti.

## Mode kerja

- **Update existing content:** mode default. Agent memilih satu artikel yang sudah ada, mengauditnya, lalu memperbarui hanya jika ada manfaat substantif.
- **Propose new topic:** ide artikel baru boleh diusulkan, tetapi tidak dibuat dalam run update-only.
- **No-change outcome:** hasil yang sah. Agent tidak boleh mengarang perubahan hanya agar workflow menghasilkan commit.

## Siklus wajib

### 1. Orientasi dan pemilihan target
1. Baca `AGENTS.md`, kebijakan editorial, dokumen ini, schema `src/content.config.ts`, serta daftar artikel yang tersedia.
2. Tinjau artikel yang relevan dan halaman/layanan terkait untuk menghindari duplikasi dan menjaga relasi internal.
3. Pilih satu target dengan alasan eksplisit: risiko fakta usang, kesenjangan jawaban, sumber bermasalah, manfaat praktis, kualitas editorial, SEO berbasis kebutuhan pembaca, atau masalah teknis.
4. Bila workflow menerima input `target_article`, gunakan target tersebut dan jangan menggantinya tanpa menjelaskan alasan blocker. Bila input kosong, Agent boleh memilih target sendiri berdasarkan prioritas kebijakan.

### 2. Audit sebelum mengedit
1. Catat klaim yang penting dan perlu diverifikasi.
2. Untuk klaim hukum/teknis, periksa sumber primer resmi yang relevan: peraturan/JDIH, kementerian/lembaga berwenang, SIMBG, atau pemerintah daerah sesuai konteks.
3. Bedakan teks peraturan, praktik lapangan, saran profesional, dan interpretasi.
4. Periksa apakah topik sudah dibahas di artikel lain; pilih memperjelas atau menautkan konten yang ada daripada membuat duplikasi.
5. Jika sumber yang cukup tidak dapat ditemukan, jangan menebak. Hapus klaim yang tidak berdasar, batasi dengan keterangan jujur, atau tandai untuk tinjauan manusia.

### 3. Rencana perubahan
Sebelum edit, tetapkan:
- masalah yang hendak diselesaikan;
- pembaca dan pertanyaan yang hendak dijawab;
- klaim/sumber yang mendukung perubahan;
- file yang diperkirakan berubah;
- risiko perubahan URL, ID, relasi, metadata, atau aset.

Rencana bukan kewajiban untuk membuat perubahan besar. Pilih diff terkecil yang menyelesaikan masalah dengan baik.

### 4. Implementasi
- Edit sumber konten, bukan output build.
- Pertahankan skema frontmatter, ID/ULID, slug, URL publik, relasi artikel-layanan, dan struktur blok yang valid.
- Tambahkan FAQ, checklist, tabel, contoh, atau subheading hanya jika memberi manfaat nyata.
- Perbaiki internal link dan rujukan resmi yang relevan.
- Jangan memasukkan topik di luar cakupan, teks pengisi, keyword stuffing, klaim sensasional, atau fakta yang belum terverifikasi.
- Jangan mengubah halaman lain kecuali perubahan tersebut memang diperlukan untuk menjaga konsistensi; jelaskan setiap file tambahan.
- Jangan mengubah `pubDate`. Perbarui `updatedDate` hanya setelah ada perubahan konten substantif.
- Jika perlu mengubah ilustrasi, pastikan ilustrasi tetap spesifik dan sesuai isi halaman. Jangan mengganti dengan gambar generik hanya demi menyentuh aset.

### 5. Validasi
Sebelum menyatakan selesai:
1. Periksa diff dan pastikan semua perubahan mendukung tujuan yang ditetapkan.
2. Periksa frontmatter dan relasi konten sesuai schema.
3. Verifikasi klaim penting dan tautan sumber; jangan mengklaim sumber telah diperiksa jika tidak.
4. Jalankan `npm run build`, yang mencakup pemeriksaan Astro, build, tautan internal, SEO output, dan konten terpublikasi.
5. Jika build gagal, perbaiki kegagalan yang disebabkan oleh perubahan. Jika penyebab di luar cakupan atau tidak dapat diperbaiki, laporkan dengan jelas dan jangan tandai berhasil.
6. Jangan menganggap tes, build, atau pemeriksaan yang tidak dijalankan sebagai lulus.

### 6. Review dan publikasi
- Tinjau diff untuk perubahan tidak terkait, fakta tanpa sumber, metadata yang berubah tanpa alasan, dan kerusakan relasi.
- Workflow AI tidak boleh langsung mem-push hasil konten ke `main` atau memublikasikannya tanpa review.
- Hasil otomatis harus disajikan untuk pemeriksaan melalui mekanisme yang disepakati (misalnya branch/PR). Perubahan hukum berisiko tinggi, perubahan URL/ID/relasi, dan klaim layanan material harus ditandai untuk review manusia.
- Jangan menyimpan token, secrets, atau data sensitif dalam konten maupun log.

## Kriteria keputusan

Pembaruan layak dilakukan jika ada bukti bahwa perubahan meningkatkan akurasi, kelengkapan, keterbacaan, kegunaan, keterhubungan, atau validitas teknis. Tidak ada target jumlah kata dan tidak ada kewajiban membuat commit setiap kali workflow berjalan.

## Format laporan run

Gunakan format ringkas ini:

- **Target:** path dan judul artikel.
- **Alasan dipilih:** masalah yang ditemukan.
- **Temuan:** fakta, kekurangan, atau peluang perbaikan.
- **Perubahan:** apa yang diubah dan manfaatnya, atau alasan tidak ada perubahan.
- **Sumber diverifikasi:** sumber primer yang benar-benar diperiksa.
- **File berubah:** daftar file dan alasan file tambahan.
- **Validasi:** perintah yang dijalankan dan hasil aktual.
- **Review manusia:** risiko/hal yang perlu ditinjau, atau “tidak ada yang teridentifikasi”.
- **Commit/PR:** tautan dan SHA jika tersedia.

## Lokasi file operasional

- `.github/workflows/update-content.yml` — workflow GitHub Actions yang dijalankan manual.
- `scripts/update-content-ai.mjs` — runtime Node.js yang memilih/audit satu artikel, memanggil OpenAI Responses API, menjaga field identitas, dan menulis hasil.
- `prompts/content-update.md` — instruksi operasional editor.
- `prompts/content-review.md` — instruksi reviewer independen yang memakai model terpisah.
- `docs/content-update-policy.md` dan dokumen ini tetap menjadi dokumentasi/kebijakan; keduanya bukan skrip yang dieksekusi.

## Catatan implementasi workflow GitHub Actions

Saat kebijakan ini dijalankan dari GitHub Actions, workflow harus:
- memulai dengan `workflow_dispatch` untuk uji coba terkontrol; jadwal otomatis baru dipertimbangkan setelah hasil beberapa run ditinjau;
- menggunakan izin minimum, tidak menyimpan secret ke output, dan tidak memberi token tulis ke job yang hanya melakukan validasi;
- tidak melakukan push langsung ke `main`; gunakan branch/PR untuk review;
- menjalankan build dan validasi proyek sebelum mengajukan perubahan;
- menyediakan input target opsional, batas jumlah target yang jelas, dan laporan hasil;
- berhenti dengan aman jika kredensial/model tidak tersedia, sumber hukum tidak dapat diverifikasi, atau hasil model tidak memenuhi format yang diperlukan.

**Status implementasi awal:** `.github/workflows/update-content.yml` tersedia dan hanya berjalan lewat `workflow_dispatch`. Workflow memerlukan secret `OPENAI_API_KEY` serta repository variables `OPENAI_MODEL` dan `OPENAI_REVIEW_MODEL`; gunakan ID model yang tersedia untuk API dan sebaiknya pilih model berbeda untuk reviewer. Run yang mengubah artikel meminta reviewer independen untuk memeriksa fakta, sumber, risiko, dan kebijakan. Jika reviewer memberi verdict `revise`, editor mendapat satu kesempatan revisi lalu reviewer memeriksa ulang. Verdict selain `pass` menghentikan workflow tanpa PR. Artikel yang lolos review AI dan build akan diajukan sebagai PR untuk review manusia; run tanpa perubahan tidak membuka PR. Belum ada jadwal otomatis dan belum ada konten yang dipublikasikan otomatis.
