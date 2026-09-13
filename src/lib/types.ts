import type { Locale } from './i18n';

export interface Seo {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ScopeItem {
  title: string;
  body: string;
}

export interface ServiceTranslation {
  seo: Seo;
  navLabel: string;
  h1: string;
  tagline: string;
  directAnswer: string;
  introHeading: string;
  intro: string;
  scope: ScopeItem[];
  process: ProcessStep[];
  deliverables: string[];
  materialsHeading: string;
  materials: string;
  budgetHeading: string;
  budgetIntro: string;
  budgetFactors: string[];
  faqs: FaqItem[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  cardSummary: string;
}

export interface Service {
  slug: string;
  priority: boolean;
  category: 'design' | 'build' | 'management' | 'specialist';
  image: string;
  relatedSlugs: string[];
  translations: Record<Locale, ServiceTranslation>;
}

export interface LocationTranslation {
  seo: Seo;
  name: string;
  h1: string;
  directAnswer: string;
  intro: string;
  context: string;
  logistics: string;
  faqs: FaqItem[];
  ctaHeading: string;
  ctaBody: string;
}

export interface Location {
  slug: string;
  tier: 'primary' | 'secondary';
  parentSlug?: string;
  image: string;
  featuredServiceSlugs: string[];
  translations: Record<Locale, LocationTranslation>;
}

export interface ProjectTranslation {
  seo: Seo;
  name: string;
  summary: string;
  story: string;
  design: string;
  materials: string;
  outcome: string;
}

export type ProjectTag = 'Architecture' | 'Villa' | 'Interior' | 'Renovation' | 'Construction' | 'Landscape' | 'Hospitality';

export interface Project {
  slug: string;
  tags: ProjectTag[];
  locationSlug: string;
  serviceSlugs: string[];
  status: 'completed' | 'in-progress' | 'concept';
  images: string[];
  translations: Record<Locale, ProjectTranslation>;
}
