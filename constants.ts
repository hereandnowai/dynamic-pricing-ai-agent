import { BrandConfig, PropertyType, Season, DayOfWeek, CabinClass } from './types';

export const BRAND_CONFIG: BrandConfig = {
  shortName: "HERE AND NOW AI",
  longName: "HERE AND NOW AI - Artificial Intelligence Research Institute",
  website: "https://hereandnowai.com",
  email: "info@hereandnowai.com",
  mobile: "+91 996 296 1000",
  slogan: "designed with passion for innovation",
  colors: {
    primary: "#FFDF00", // Golden Yellow
    secondary: "#004040", // Dark Teal
  },
  logo: {
    title: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png",
    favicon: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/favicon-logo-with-name.png",
  },
  chatbot: {
    avatar: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel.jpeg",
    face: "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg",
  },
  socialMedia: {
    blog: "https://hereandnowai.com/blog",
    linkedin: "https://www.linkedin.com/company/hereandnowai/",
    instagram: "https://instagram.com/hereandnow_ai",
    github: "https://github.com/hereandnowai",
    x: "https://x.com/hereandnow_ai",
    youtube: "https://youtube.com/@hereandnow_ai",
  },
};

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const PROPERTY_TYPES_OPTIONS = Object.values(PropertyType).map(value => ({ value, label: value }));
export const SEASON_OPTIONS = Object.values(Season).map(value => ({ value, label: value }));
export const DAYOFWEEK_OPTIONS = Object.values(DayOfWeek).map(value => ({ value, label: value }));
export const CABIN_CLASS_OPTIONS = Object.values(CabinClass).map(value => ({ value, label: value }));