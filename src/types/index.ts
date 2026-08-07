export interface Photo {
  id: string;
  src: string;
  title: string;
  caption?: string;
}

export interface Series {
  id: string;
  title: string;
  titleEn: string;
  year: string;
  description: string;
  cover: string;
  photos: Photo[];
}

export interface Attachment {
  fileName: string;
  fileUrl: string;
}

export interface PressItem {
  id: string;
  title: string;
  author: string;
  media: string;
  date: string;
  url?: string;
  excerpt?: string;
  body?: string;
  attachments?: Attachment[];
}

export interface WritingItem {
  id: string;
  title: string;
  author: string;
  media: string;
  date: string;
  url?: string;
  excerpt?: string;
  body?: string;
  attachments?: Attachment[];
}

export interface ShopItem {
  id: string;
  title: string;
  category: 'book' | 'print' | 'merchandise';
  price: string;
  currency: string;
  image: string;
  description: string;
  edition?: string;
}

export interface Film {
  id: string;
  title: string;
  year: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

export interface ArtistInfo {
  name: string;
  nameEn: string;
  email: string;
  bio: string;
  portrait: string;
  education: { year: string; detail: string }[];
  soloExhibitions: { year: string; title: string; venue: string }[];
  groupExhibitions: { year: string; title: string; venue: string }[];
  awards: { year: string; title: string }[];
}

export type PageId = 'home' | 'works' | 'films' | 'press' | 'writing' | 'shop' | 'about' | 'contact' | 'pressDetail' | 'writingDetail';

export interface NavState {
  page: PageId;
  seriesId?: string;
  itemId?: string;
}
