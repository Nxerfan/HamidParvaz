import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nxerfan.github.io/HamidParvaz";

  // Static routes
  const staticRoutes = [
    "",
    "/home",
    "/flight",
    "/flight/flightse",
    "/flight/flightch",
    "/flight/reserve/form",
    "/flight/reserve/prepay",
    "/flight-info",
    "/hotel",
    "/hotel/hotelse",
    "/hotel/hotelch",
    "/hotel/reserve/form",
    "/hotel/reserve/prepay",
    "/hotel-on-map",
    "/tour",
    "/tour/tourse",
    "/tour/tourch",
    "/tour/reserve/form",
    "/tour/reserve/prepay",
    "/tour/make-your-own",
    "/tour/make-your-own/flight/away",
    "/tour/make-your-own/flight/return",
    "/tour/make-your-own/hotel",
    "/tour/make-your-own/hotel/room",
    "/tour/make-your-own/passenger-info",
    "/tour/make-your-own/payment",
    "/get-tour",
    "/blog",
    "/faq",
    "/guid",
    "/rules",
    "/about-us",
    "/company",
    "/cooperation",
    "/cancellation",
    "/cancellation/flight",
    "/cancellation/hotel",
    "/cancellation/tour",
    "/auth",
    "/userpanel",
    "/userpanel/pax",
    "/userpanel/messages",
    "/userpanel/club",
    "/userpanel/club/history",
    "/userpanel/club/level",
    "/userpanel/club/used-score",
    "/userpanel/tracking",
    "/userpanel/creadit",
    "/userpanel/gift-card",
    "/userpanel/auto-reserve",
    "/userpanel/change-password",
    "/userpanel/tel-robat",
    "/reserve/form",
    "/reserve/prepay",
    "/reserve/auto-reserve",
    "/reserve/auto-reserve/filters",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "monthly" as const : "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    // Tour detail pages (SSG)
    {
      url: `${baseUrl}/tour/istanbul-tour`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tour/kish-tour`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tour/thailand-tour`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    // Tour tag pages
    ...["travel", "استانبول", "کیش", "دبی", "آنتالیا", "تفلیس", "ایروان", "باکو", "مشهد", "تایلند"].map(
      (dest) => ({
        url: `${baseUrl}/tour/${encodeURIComponent(dest)}/tour-tag`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }),
    ),
  ];
}
