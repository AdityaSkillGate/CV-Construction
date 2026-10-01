export interface Project {
  id: string;
  name: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Renovation' | 'Turnkey';
  year: string;
  area: string;
  completion: string;
  imageUrl: string;
  secondaryImage?: string;
  description: string;
  highlights: string[];
  client: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface WhyFeature {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organization: string;
  project: string;
  rating: number;
  avatarUrl: string;
}

export interface ConstructionStage {
  number: string;
  title: string;
  description: string;
  percentRange: [number, number];
  metrics: { [key: string]: string };
}
