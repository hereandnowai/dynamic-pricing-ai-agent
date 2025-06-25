export enum PropertyType {
  HOTEL = 'Hotel',
  FLIGHT = 'Flight',
}

export enum Season {
  PEAK = 'Peak',
  OFF_PEAK = 'Off-Peak',
  SHOULDER = 'Shoulder',
  HOLIDAY = 'Holiday',
  SPRING = 'Spring',
  SUMMER = 'Summer',
  AUTUMN = 'Autumn',
  WINTER = 'Winter',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum CabinClass {
  ECONOMY = 'Economy',
  PREMIUM_ECONOMY = 'Premium Economy',
  BUSINESS = 'Business',
  FIRST = 'First',
}

export interface PricingRequest {
  propertyType: PropertyType;
  location: string;
  propertyName: string;
  roomTypeOrRoute: string; // Used for Hotel Room Type
  flightRoute?: string; // Used for Flight Route
  cabinClass?: CabinClass; // Used for Flight Cabin Class
  currentPrice: number | '';
  checkInDate: string;
  checkOutDate: string;
  totalInventory: number | '';
  currentOccupancy: number | '';
  daysUntilArrival: number | '';
  season: Season;
  dayOfWeek: DayOfWeek;
  localEvents: string;
  competitor1Name: string;
  competitor1Price: number | '';
  competitor2Name: string;
  competitor2Price: number | '';
  competitor3Name: string;
  competitor3Price: number | '';
  marketAveragePrice: number | '';
  historicalPrice: number | '';
  historicalOccupancy: number | '';
  recentAveragePrice: number | '';
  bookingsPerDay: number | '';
  minPrice: number | '';
  maxPrice: number | '';
  targetOccupancy: number | '';
  revenueTarget: number | '';
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface PricingReport {
  recommendedPrice: number;
  recommendedPriceReasoning: string;
  priceRange: PriceRange;
  confidenceLevel: number; // 1-10
  marketPosition: string;
  demandForecast: string;
  revenueImpact: string;
  riskAssessment: string;
  nextReview: string;
}

// Props for PricingReportDisplay component
export interface PricingReportDisplayProps {
  report: PricingReport;
  brandColors: BrandColors;
  propertyType: PropertyType;
}


// Branding types
export interface BrandColors {
  primary: string;
  secondary: string;
}

export interface BrandLogo {
  title: string;
  favicon: string;
}

export interface BrandChatbot {
  avatar: string;
  face: string;
}

export interface BrandSocialMedia {
  blog: string;
  linkedin: string;
  instagram: string;
  github: string;
  x: string;
  youtube: string;
}

export interface BrandConfig {
  shortName: string;
  longName: string;
  website: string;
  email: string;
  mobile: string;
  slogan: string;
  colors: BrandColors;
  logo: BrandLogo;
  chatbot: BrandChatbot;
  socialMedia: BrandSocialMedia;
}