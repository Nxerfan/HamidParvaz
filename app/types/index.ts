import type { IconProp } from "@fortawesome/fontawesome-svg-core";

// ─── Destinations ───
export interface Destination {
  id: number;
  name: string;
  type: "domestic" | "foreign";
}

// ─── Hotels ───
export interface HotelRoomType {
  name: string;
  price: number;
  capacity: string;
}

export interface HotelFAQ {
  question: string;
  answer: string;
}

export interface Hotel {
  id: number;
  name: string;
  image: string;
  images?: string[];
  stars: number;
  location: string;
  rating: number;
  pricePerNight: number;
  priceText?: string;
  description: string;
  facilities: string[];
  roomTypes: HotelRoomType[];
  checkInStart: number;
  checkInEnd: number;
  checkOutStart: number;
  checkOutEnd: number;
  isCancelable: boolean;
  faq?: HotelFAQ[];
}

// ─── Tours ───
export interface Tour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  agency: string;
  image: string;
  images?: string[];
  durationNights: number;
  durationDays: number;
  mealPlan: string;
  hotelStars: number;
  price: number;
  originalPrice?: number;
  capacity: number | string;
  isSpecial: boolean;
  badge?: string;
  departureCity: string;
  airline?: string;
  services: string[];
  location?: string;
  date?: string;
  description?: string;
  eventSlug?: string;
}

// ─── Flights ───
export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  price: number;
  capacity: number;
  type: "domestic" | "foreign";
}

// ─── Articles ───
export interface ArticleAuthor {
  image: string;
  name: string;
  role: string;
}

export interface FeaturedImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ShareLink {
  name: string;
  href: string;
  icon: IconProp;
}

export interface ShareData {
  title: string;
  links: ShareLink[];
}

export interface HighlightData {
  title: string;
  items: string[];
}

export type ContentBlockType =
  | "p"
  | "h2"
  | "h3"
  | "ul"
  | "infoBox"
  | "image";

export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  id?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

export interface TocItem {
  id: string;
  title: string;
}

export interface RelatedPost {
  image: string;
  title: string;
  href: string;
  time: string;
}

export interface CTAData {
  title: string;
  text: string;
  buttonText: string;
  href: string;
}

export interface ArticleFullContent {
  category: string;
  title: string;
  author: ArticleAuthor;
  date: string;
  views: string;
  featuredImage: FeaturedImage;
  share: ShareData;
  highlight: HighlightData;
  articleContent: ContentBlock[];
  tags: string[];
  toc: TocItem[];
  relatedPosts: RelatedPost[];
  cta: CTAData;
}

export interface Article {
  id: number;
  slug: string;
  category: "tour" | "hotel" | "flight";
  categoryLabel: string;
  image: string;
  title: string;
  excerpt: string;
  readTime: string;
  fullContent?: ArticleFullContent;
}

// ─── Hotel Detail (Modal) ───
export interface HotelDetailData {
  id: number;
  name: string;
  image: string;
  stars: number;
  location: string;
  rating: number;
  pricePerNight: number;
  facilities: string[];
  roomType?: "standard" | "luxury";
  checkInStartHour?: number;
  checkInEndHour?: number;
  checkOutStartHour?: number;
  checkOutEndHour?: number;
  brand?: string;
  isCancelable?: boolean;
}

// ─── User / Auth ───
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// ─── Filters ───
export interface FilterState {
  priceRange: { min: number; max: number };
  sortBy: string;
  notifyOnPriceChange: boolean;
  selectedOptions: Record<string, string[]>;
}

// ─── Calendar ───
export interface JalaaliDateObj {
  jy: number;
  jm: number;
  jd: number;
}

// ─── Passenger ───
export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female";
  passportNumber?: string;
  phone?: string;
  email?: string;
  isDefault?: boolean;
}

// ─── FAQ ───
export interface FAQItem {
  question: string;
  answer: string;
}

// ─── Tour Detail Page ───
export interface TourDetailData {
  images: string[];
  options: { icon: string; label: string }[];
  hotelInfoData: {
    title: string;
    rating: number;
    options: string[];
    description: string;
  }[];
  hotelRules: {
    checkIn: string;
    checkOut: string;
    descriptions: string[];
  };
  faqData: FAQItem[];
  hotels: {
    name: string;
    stars: number;
    rate: number;
    price: number;
    priceText: string;
    location: string;
  }[];
  itineraryData: {
    duration: string;
    days: { day: string; title: string; description: string }[];
  };
  tourData: {
    badges: string[];
    title: string;
    priceLabel: string;
    price: number;
    flights: { departure: string; return: string };
  };
}

// ─── Blog ───
export interface BlogArticleData {
  id: number;
  slug: string;
  category: string;
  categoryLabel: string;
  image: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
}

export interface SidebarCategory {
  label: string;
  count: string;
  href: string;
}

export interface PopularPost {
  image: string;
  title: string;
  views: string;
}

export interface BlogSidebarData {
  searchPlaceholder: string;
  searchButton: string;
  categoriesTitle: string;
  categories: SidebarCategory[];
  popularTitle: string;
  popularPosts: PopularPost[];
  newsletterTitle: string;
  newsletterText: string;
  newsletterPlaceholder: string;
  subscribeButton: string;
}
