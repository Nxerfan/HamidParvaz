import TourDetailClient from "./TourDetailClient";
import { toursDB } from "../../data/tours";

export function generateStaticParams() {
  return toursDB.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  return <TourDetailClient slug={slug} />;
}
