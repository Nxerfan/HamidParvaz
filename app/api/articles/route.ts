import { NextRequest, NextResponse } from "next/server";
import { articlesDB } from "../../data/articles";
import type { Article } from "../../data/articles";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    let results: Article[] = [...articlesDB];

    if (category) {
      results = results.filter((a) => a.category === category);
    }
    if (slug) {
      results = results.filter((a) => a.slug === slug);
    }

    return NextResponse.json<Article[]>(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت لیست مقالات" },
      { status: 500 },
    );
  }
}
