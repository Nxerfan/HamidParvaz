import { Suspense } from "react";
import TourDetailClient from "./TourDetailClient";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { toursDB } from "../../data/tours";

export async function generateStaticParams() {
  return toursDB.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<LoadingSkeleton type="detail" />}>
      <TourDetailClient slug={slug} />
    </Suspense>
  );
}
