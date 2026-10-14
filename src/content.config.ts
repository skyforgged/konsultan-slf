import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedIdentity = {
  id: z.number().int().positive(),
  ulid: z.string().length(26),
  title: z.string().min(1),
  description: z.string().min(1),
  draft: z.boolean().default(false),
  image: z.string().optional(),
};

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    ...sharedIdentity,
    type: z.literal('article'),
    slug: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    relatedType: z.enum(['service', 'page', 'article']).optional(),
    relatedId: z.number().int().positive().optional(),
    relatedArticles: z.array(z.number().int().positive()).default([]),
    blocks: z.array(z.discriminatedUnion('component', [
      z.object({
        component: z.literal('card'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1),
        icon: z.string().optional(),
        class: z.record(z.string()).optional(),
        body: z.array(z.discriminatedUnion('type', [
          z.object({ type: z.literal('p'), text: z.string().min(1), class: z.string().optional() }),
          z.object({ type: z.literal('list'), ordered: z.boolean().default(false), items: z.array(z.string().min(1)).min(1), class: z.string().optional(), itemClass: z.string().optional() }),
          z.object({ type: z.literal('image'), src: z.string().min(1), alt: z.string().min(1), caption: z.string().optional(), class: z.string().optional(), imgClass: z.string().optional(), captionClass: z.string().optional() }),
        ])).default([]),
      }),
      z.object({
        component: z.literal('faq'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1),
        icon: z.string().optional(),
        class: z.record(z.string()).optional(),
        items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
      }),
      z.object({
        component: z.literal('cta'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1).optional(),
        icon: z.string().optional(),
        message: z.string().min(1),
        button: z.string().min(1).optional(),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('table'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1).optional(),
        icon: z.string().optional(),
        head: z.array(z.string().min(1)).min(1),
        rows: z.array(z.array(z.string().min(1))).min(1),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('note'),
        id: z.string().min(1).optional(),
        variant: z.enum(['info', 'success', 'warning', 'danger']).default('info'),
        title: z.string().min(1).optional(),
        text: z.string().min(1),
        icon: z.string().optional(),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('steps'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1),
        icon: z.string().optional(),
        items: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('stats'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1).optional(),
        icon: z.string().optional(),
        items: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('glossary'),
        id: z.string().min(1).optional(),
        heading: z.string().min(1),
        icon: z.string().optional(),
        items: z.array(z.object({ term: z.string().min(1), definition: z.string().min(1) })).min(1),
        class: z.record(z.string()).optional(),
      }),
      z.object({
        component: z.literal('quote'),
        id: z.string().min(1).optional(),
        text: z.string().min(1),
        source: z.string().min(1).optional(),
        class: z.record(z.string()).optional(),
      }),
    ])).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    ...sharedIdentity,
    type: z.literal('page'),
    slug: z.string().min(1),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    navLabel: z.string().optional(),
    seoTitle: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    ...sharedIdentity,
    type: z.literal('service'),
    slug: z.string().min(1),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    serviceGroup: z.enum(['slf', 'pbg']).default('slf'),
    order: z.number().int().default(100),
    benefits: z.array(z.string()).default([]),
    process: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    ctaLabel: z.string().default('Konsultasikan Kebutuhan Anda'),
  }),
});

export const collections = { articles, pages, services };
