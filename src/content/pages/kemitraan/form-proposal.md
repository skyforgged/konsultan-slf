---
id: 206
ulid: "01M5773Q4Z1X2C3V4B5N6M7Q9B"
title: "Form Proposal Pendaftaran Mitra (Echo)"
description: "Formulir proposal pendaftaran mitra (tanpa penyimpanan data) untuk meninjau field dan alur sebelum implementasi produksi."
pubDate: "2026-10-26T11:00:00Z"
updatedDate: "2026-10-26T11:02:00Z"
image: "/images/illustrations/service-directory.svg"
socialImage: "/images/social/kemitraan.webp"
type: "page"
draft: false
navLabel: "Form Proposal Mitra"
canonical: "/kemitraan/form-proposal/"
slug: "kemitraan/form-proposal"
blocks:
  - component: "page-header"
    eyebrow: "Form proposal"
    heading: "Formulir proposal pendaftaran mitra"
    intro: "Formulir ini tidak menyimpan data ke server. Setelah dikirim, data yang diinput akan ditampilkan kembali (echo) untuk ditinjau sebelum field final ditetapkan."
    image: "/images/illustrations/service-directory.svg"
    imageAlt: "Ilustrasi formulir proposal pendaftaran mitra SLF dan PBG"
  - component: "multi-step-form"
    id: "proposal-mitra"
    heading: "Formulir pendaftaran mitra (proposal)"
    intro: "Isi langkah demi langkah. Data tidak disimpan; hanya ditampilkan kembali setelah submit."
    submitLabel: "Kirim & tampilkan ringkasan"
    successMessage: "Formulir berhasil dikirim (simulasi)."
    steps:
      - title: "Identitas"
        fields:
          - name: "nama"
            label: "Nama lengkap"
            type: "text"
            required: true
            hint: "Nama lengkap Anda"
          - name: "email"
            label: "Email"
            type: "email"
            required: true
            hint: "nama@contoh.com"
          - name: "whatsapp"
            label: "Nomor yang dapat dihubungi"
            type: "tel"
            required: true
            hint: "08xxxxxxxxxx"
          - name: "domisili"
            label: "Kota/Provinsi domisili"
            type: "text"
            required: true
            hint: "Kota/provinsi tempat Anda berdomisili"
          - name: "profesi"
            label: "Profesi/pekerjaan saat ini"
            type: "text"
            required: false
            hint: "Contoh: konsultan, arsitek, engineer"
          - name: "perusahaan"
            label: "Perusahaan/organisasi"
            type: "text"
            required: false
            hint: "Nama perusahaan/badan usaha (jika ada)"
      - title: "Minat kemitraan"
        fields:
          - name: "skema"
            label: "Skema yang diminati"
            type: "select"
            required: true
            hint: "Pilih satu skema kemitraan yang paling sesuai"
            options:
              - "Referral"
              - "Mitra Kolaboratif"
              - "Perwakilan Daerah"
              - "Cabang Resmi"
              - "Belum yakin / ingin konsultasi dulu"
          - name: "wilayah"
            label: "Wilayah yang ingin dilayani/dikembangkan"
            type: "text"
            required: true
            hint: "Contoh: Jawa Timur, DKI Jakarta"
          - name: "pengalaman"
            label: "Pengalaman di bidang SLF/PBG/perizinan"
            type: "select"
            required: true
            hint: "Pilih tingkat pengalaman Anda"
            options:
              - "Belum ada"
              - "Dasar"
              - "Menengah"
              - "Berpengalaman"
          - name: "targetMulai"
            label: "Target waktu mulai"
            type: "select"
            required: true
            hint: "Kapan Anda siap memulai"
            options:
              - "Segera"
              - "1-3 bulan"
              - "3-6 bulan"
              - "Belum tahu"
      - title: "Konteks & kesiapan"
        fields:
          - name: "alasan"
            label: "Alasan tertarik menjadi mitra"
            type: "textarea"
            required: true
            hint: "Jelaskan singkat motivasi Anda"
          - name: "jaringan"
            label: "Apakah memiliki jaringan ke pemilik bangunan/pengembang?"
            type: "radio"
            required: true
            hint: "Pilih sesuai kondisi Anda"
            options:
              - "Ya"
              - "Tidak"
          - name: "siapSOP"
            label: "Bersedia mengikuti SOP & pelatihan?"
            type: "select"
            required: true
            hint: "Pilih kesediaan Anda"
            options:
              - "Ya"
              - "Tidak"
              - "Belum tahu"
          - name: "siapBiaya"
            label: "Bersedia menanggung biaya awal (lisensi/operasional)?"
            type: "select"
            required: true
            hint: "Pilih kesediaan Anda"
            options:
              - "Ya"
              - "Tidak"
              - "Belum tahu"
      - title: "Persetujuan"
        fields:
          - name: "consentData"
            label: "Saya menyetujui pengumpulan & penggunaan data untuk seleksi mitra"
            type: "checkbox"
            required: true
            hint: "Wajib untuk melanjutkan"
          - name: "consentKontak"
            label: "Saya bersedia dihubungi via WhatsApp/email"
            type: "checkbox"
            required: true
            hint: "Wajib untuk melanjutkan"
          - name: "consentInfo"
            label: "Saya bersedia menerima info/update program mitra"
            type: "checkbox"
            required: false
            hint: "Opsional"
  - component: "note"
    id: "catatan-proposal"
    variant: "info"
    title: "Catatan"
    text: "Ini adalah form proposal untuk persetujuan field. Data tidak dikirim ke server dan tidak disimpan. Untuk implementasi produksi, ganti handler submit dengan endpoint (mis. Formspree/Web3Forms) atau layanan form."
---
