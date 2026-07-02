import { NextRequest, NextResponse } from "next/server";
import { articlesDB } from "../../../data/articles";
import type { Article } from "../../../data/articles";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "شناسه مقاله نامعتبر است" },
        { status: 400 },
      );
    }

    const article = articlesDB.find((a) => a.id === numericId);

    if (!article) {
      return NextResponse.json(
        { error: "مقاله مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json<Article>(article, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات مقاله" },
      { status: 500 },
    );
  }
}
