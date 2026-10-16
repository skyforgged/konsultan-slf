---
id: 99
ulid: "01HQRT5Y6A0L4N3O8Q7R9T6U5Y"
slug: "contoh-css-props"
title: "Contoh Penggunaan CSS Props di Frontmatter"
description: "Demo cara menambahkan custom CSS classes ke component blocks melalui frontmatter."
pubDate: "2026-01-20T09:00:00Z"
updatedDate: "2026-10-16T07:00:00Z"
draft: true
type: "article"
category: "Demo"
blocks:
  - component: note
    variant: info
    title: "Catatan Demo"
    text: "Ini adalah contoh note dengan custom CSS prop."
    class:
      section: "bg-amber-50 border-amber-200"
      title: "text-amber-800"
      text: "text-amber-700"
  - component: faq
    heading: "FAQ Demo"
    class:
      section: "bg-purple-50 border-purple-200"
      heading: "text-purple-700"
    items:
      - question: "Apakah CSS props bekerja?"
        answer: "Ya! Custom classes dari frontmatter akan di-merge ke component default styles."
  - component: section
    id: "penutup"
    heading: "Penutup"
    content:
      - type: p
        text: "Ini adalah contoh section block biasa."
---