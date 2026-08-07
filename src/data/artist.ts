import type { Series, PressItem, ShopItem, Film, ArtistInfo, WritingItem } from '@/types';

// Single-file content imports
import artistData from '@/content/artist.json';
import contactData from '@/content/contact.json';

// Folder collection imports via Vite glob (eager = bundled at build time)
const worksModules = import.meta.glob('@/content/works/*.json', { eager: true });
const pressModules = import.meta.glob('@/content/press/*.json', { eager: true });
const shopModules = import.meta.glob('@/content/shop/*.json', { eager: true });
const filmsModules = import.meta.glob('@/content/films/*.json', { eager: true });
const writingModules = import.meta.glob('@/content/writing/*.json', { eager: true });

// Artist info
export const artist: ArtistInfo = artistData as ArtistInfo;

// Works — sorted by year descending
export const series: Series[] = Object.values(worksModules)
  .map((m) => (m as { default: Series }).default)
  .sort((a, b) => parseInt(b.year) - parseInt(a.year));

// Press — sorted by date descending
export const pressItems: PressItem[] = Object.values(pressModules)
  .map((m) => (m as { default: PressItem }).default)
  .sort((a, b) => b.date.localeCompare(a.date));

// Shop items
export const shopItems: ShopItem[] = Object.values(shopModules)
  .map((m) => (m as { default: ShopItem }).default);

// Films — sorted by year descending
export const films: Film[] = Object.values(filmsModules)
  .map((m) => (m as { default: Film }).default)
  .sort((a, b) => parseInt(b.year) - parseInt(a.year));

// Writing — sorted by date descending
export const writingItems: WritingItem[] = Object.values(writingModules)
  .map((m) => (m as { default: WritingItem }).default)
  .sort((a, b) => b.date.localeCompare(a.date));

// Contact info (managed via CMS)
export interface ContactInfo {
  email: string;
  studioLocation: string;
  studioNote: string;
  galleries: { name: string; role: string }[];
  mediaInquiry: string;
}

export const contactInfo: ContactInfo = contactData as ContactInfo;
