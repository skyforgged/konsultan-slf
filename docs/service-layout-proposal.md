# ServiceLayout — Rancangan & Evaluasi

**Tanggal:** 2026-10-15
**Status:** Evaluasi, belum dibuat

## Perbandingan: ArticleLayout vs Service (saat ini)

| Aspek | ArticleLayout | Service (langsung BaseLayout) |
|---|---|---|
| Struktur HTML | `<main>` landmark + `<article>` | `<main>` polos |
| TOC sidebar | Ada (sticky, mobile collapsible) | Tidak ada |
| Related articles slot | Ada (`<slot name="related" />`) | Hardcoded di `[slug].astro` |
| Footer context-aware | Ya (berdasarkan `relatedId` → service title) | Tidak |
| JSON-LD | Article/BlogPosting | Service + FAQPage + BreadcrumbList |
| Breadcrumbs | Tidak ada | Ada |
| CTA section | Ada (di bawah article, dalam layout) | Tidak ada |
| Author + pubDate | Ada di header | Tidak ada |
| Image hero | max-w-2xl, rounded, fetchpriority high | max-w-60, object-contain |

## Perubahan yang Diusulkan untuk ServiceLayout

### Ditambahkan ke layout
1. `<main>` landmark dengan struktur grid (TOC aside + content article)
2. `<article>` wrapper untuk konten utama
3. `<slot name="related" />` — related articles dinamis
4. Footer context-aware berdasarkan `serviceGroup` (slf/pbg)

### Tetap di page file (`[slug].astro`)
- Semua JSON-LD (Service, FAQPage, BreadcrumbList)
- Breadcrumbs markup
- Hero section (image + title + description)
- Intro, scope, requirements, benefits, process, notes, faq blocks
- Source links
- CTA section (bisa pindah ke layout nanti jika perlu)

## Pertanyaan Evaluasi

1. **TOC untuk service?** — Service punya heading dari frontmatter blocks, tapi bukan Markdown-generated headings. Apakah perlu TOC sidebar seperti article?

2. **Related articles slot** — Layout menerima slot, tapi apakah setiap halaman service sudah memiliki `slots` untuk related articles di `[slug].astro`?

3. **CTA section** — Saat ini service page punya CTA custom (`service.data.ctaLabel`, `service.data.ctaDescription`). Apakah mau dipindah ke layout atau tetap di page?

4. **Footer context-aware** — Saat ini ArticleLayout menggunakan `relatedId` untuk menentukan service title di footer. Untuk service page, footer harus menampilkan title layanan itu sendiri (`PT Zof Engineering Indonesia melayani jasa [title].`).

5. **Image hero** — Service image saat ini max-w-60 (kecil). Apakah mau diperbesar seperti article (max-w-2xl)?

## Keputusan yang Diambil

- [x] TOC: tidak
- [x] Related articles slot: ya (default)
- [x] CTA: tetap di page (service punya CTA custom per layanan)
- [x] Footer: context-aware per serviceTitle (title layanan saat ini)
- [x] Image hero: resize ke max-w-2xl (sama dengan article)
