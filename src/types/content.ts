// Shapes of the site content in src/data/index.ts. Pages render these as-is,
// so adding a field here is the first step to showing something new.

export type IconName = 'linkedin' | 'github' | 'email' | 'resume' | 'download';

export interface NavLink {
  name: string;
  path: `/${string}`;
}

export interface SkillGroup {
  icon: string;
  title: string;
  description: string;
  skills: string[];
}

export interface Education {
  year: string;
  degree: string;
  school: string;
  description: string;
}

export interface Interest {
  icon: string;
  title: string;
}

export interface HomeContent {
  profileImage: string;
  skills: SkillGroup[];
  education: Education[];
  interests: Interest[];
}

export interface Experience {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Award {
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  /** Shown as-is, e.g. "Apr 2026 · ID: abc123". */
  date: string;
  /** Use '#' until a public certificate URL exists; the page hides the link. */
  link: string;
  skills: string[];
}

export interface CareerContent {
  skills: Record<string, string[]>;
  experiences: Experience[];
  awards: Award[];
  education: Education[];
  certifications: Certification[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: Extract<IconName, 'linkedin' | 'github'>;
  display: string;
}

export interface ContactContent {
  email: string;
  resume: { url: string; fileName: string };
  socials: SocialLink[];
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  /** Must match a BlogCategory id. */
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  /** Use '#' while the post isn't published. */
  mediumUrl: string;
  comingSoon?: boolean;
}

export interface BlogContent {
  categories: BlogCategory[];
  posts: BlogPost[];
}
