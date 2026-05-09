// app/blog/[slug]/page.tsx
import NiksaArticle from "../../components/NixaArticle";
import { loadArticles } from "../../data/articles";

// ✅ تولید تمام اسلاگ‌ها در زمان build
export async function generateStaticParams() {
  const articles = loadArticles();
  console.log("تعداد مقالات یافت شده:", articles.length); // برای دیباگ در ترمینال
  if (!articles.length) {
    throw new Error("هیچ مقاله‌ای برای تولید مسیر استاتیک وجود ندارد!");
  }
  const params = articles.map((article) => ({
    slug: article.slug,
  }));
  console.log("پارامترهای تولید شده:", params);
  return params;
}

// ✅ صفحه با دریافت async params
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NiksaArticle slug={slug} />;
}
