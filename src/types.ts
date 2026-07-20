export interface CompanyInfo {
  name: string;
  logoText: string;
  phone: string;
  whatsappMsgDefault: string;
  email: string;
  address: string;
  cityState: string;
  workingHours: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
  bgImageUrl: string;
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  text1: string;
  text2: string;
  licenseTitle: string;
  licenseText: string;
  values: ValueCard[];
}

export interface MachineItem {
  id: string;
  name: string;
  category: "pesada" | "suporte" | "acessorios";
  description: string;
  specs: string[];
  imageUrl: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  text: string;
  items: ServiceItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "supressao" | "locacao" | "limpeza";
  description: string;
  imageUrl: string;
  localPath: string; // To help them document where their local file goes
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export interface SiteData {
  company: CompanyInfo;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  machines: MachineItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
}
