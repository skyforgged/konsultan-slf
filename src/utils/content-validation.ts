import { getCollection } from 'astro:content';

export async function validateContentRelations(): Promise<void> {
  const [articles, pages, services] = await Promise.all([
    getCollection('articles'),
    getCollection('pages'),
    getCollection('services'),
  ]);

  assertUnique(articles, 'article');
  assertUnique(pages, 'page');
  assertUnique(services, 'service');

  const targets = { article: articles, page: pages, service: services };

  for (const article of articles) {
    const { relatedType, relatedId, relatedArticles = [] } = article.data;
    if ((relatedType === undefined) !== (relatedId === undefined)) {
      throw new Error(`Article "${article.data.slug}" must set both relatedType and relatedId, or neither.`);
    }
    if (relatedType && relatedId !== undefined) {
      const target = targets[relatedType].find((item) => item.data.id === relatedId && !item.data.draft);
      if (!target) {
        throw new Error(`Article "${article.data.slug}" references missing or draft ${relatedType} ID ${relatedId}.`);
      }
    }
    for (const relatedIdValue of relatedArticles) {
      const target = articles.find((item) => item.data.id === relatedIdValue && !item.data.draft);
      if (!target) {
        throw new Error(`Article "${article.data.slug}" references missing, draft, or unpublished related article ID ${relatedIdValue}.`);
      }
      if (target.data.id === article.data.id) {
        throw new Error(`Article "${article.data.slug}" cannot reference itself in relatedArticles.`);
      }
    }
  }
}

function assertUnique<T extends { data: { id: number; slug: string } }>(items: T[], type: string): void {
  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const item of items) {
    if (ids.has(item.data.id)) throw new Error(`Duplicate ${type} ID: ${item.data.id}.`);
    if (slugs.has(item.data.slug)) throw new Error(`Duplicate ${type} slug: "${item.data.slug}".`);
    ids.add(item.data.id);
    slugs.add(item.data.slug);
  }
}
