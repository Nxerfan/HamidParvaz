import NiksaArticle from "../../components/Article"; 
import { loadArticles } from "../../data/articles";

export async function generateStaticParams() {
  const articles = loadArticles();
  if (!articles.length) {
    throw new Error("هیچ مقاله‌ای برای تولید مسیر استاتیک وجود ندارد!");
  }
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  return <NiksaArticle slug={slug} />;
}
