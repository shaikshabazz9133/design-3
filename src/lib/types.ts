export type Brand = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: string[];
  city: string;
  hours: { days: string; time: string }[];
  map: { lat: number; lon: number; label: string };
  socials: { label: string; href: string }[];
  founded: number;
};

export type Material = { name: string; note: string; swatch: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  area: string;
  duration: string;
  client: string;
  summary: string;
  overview: string[];
  concept: string;
  challenge: string;
  materials: Material[];
  hero: string;
  gallery: { src: string; alt: string }[];
  heroAlt: string;
  beforeAfter?: { before: string; after: string; beforeAlt: string; afterAlt: string };
  services: string[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
  timeline: string;
};

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  body: PostBlock[];
  featured?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
  rating: number;
};

export type TeamMember = { name: string; role: string; bio: string; image: string };

export type ProcessStep = {
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
};

export type Faq = { q: string; a: string };

export type Stat = { value: number; suffix?: string; label: string };

export type Milestone = { year: string; title: string; text: string };

export type SiteContent = {
  base: string;
  brand: Brand;
  projects: Project[];
  services: Service[];
  posts: Post[];
  testimonials: Testimonial[];
  team: TeamMember[];
  process: ProcessStep[];
  faqs: Faq[];
  stats: Stat[];
  milestones: Milestone[];
};
