import { Suspense } from "react";
import TourDetailClient from "./TourDetailClient";
import LoadingSkeleton from "../../components/LoadingSkeleton";

export const dynamic = "force-dynamic";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  return (
    <Suspense fallback={<LoadingSkeleton type="detail" />}>
      <TourDetailClient slug={slug} />
    </Suspense>
  );
}
