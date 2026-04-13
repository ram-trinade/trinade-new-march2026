import { ARTICLES, FEATURED_ARTICLE } from '@/data/articles';
import { notFound } from 'next/navigation';
import ArticlePageClient from '@/components/blog-article-client';

export function generateStaticParams() {
  return [FEATURED_ARTICLE, ...ARTICLES].map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allArticles = [FEATURED_ARTICLE, ...ARTICLES];
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticlePageClient article={article} />;
}
