import { NextResponse } from "next/server";
import { articlesDB } from "../../data/articles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogArticles = articlesDB.map((a) => ({
      id: a.id,
      slug: a.slug,
      category: a.category,
      categoryLabel: a.categoryLabel,
      image: a.image,
      title: a.title,
      excerpt: a.excerpt,
      readTime: a.readTime,
    }));

    return NextResponse.json(
      { articles: blogArticles },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات بلاگ" },
      { status: 500 },
    );
  }
}
