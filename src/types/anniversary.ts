export interface CoupleInfo {
  firstName: string;
  secondName: string;
  anniversaryDate: string;
  title: string;
}

export interface OpeningContent {
  eyebrow: string;
  message: string;
  buttonLabel: string;
}

export interface BeginningContent {
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  date: string;
  featured?: boolean;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface LittleThing {
  title: string;
  message: string;
  icon?: string;
}

export interface LetterContent {
  title: string;
  paragraphs: string[];
  signOff: string;
  signName: string;
}

export interface FutureContent {
  title: string;
  message: string;
  promises: string[];
}

export interface FinalRevealContent {
  title: string;
  message: string;
  image?: string;
}

export interface AnniversaryContent {
  couple: CoupleInfo;
  opening: OpeningContent;
  beginning: BeginningContent;
  gallery: GalleryItem[];
  timeline: TimelineEvent[];
  littleThings: LittleThing[];
  letter: LetterContent;
  future: FutureContent;
  finalReveal: FinalRevealContent;
}
