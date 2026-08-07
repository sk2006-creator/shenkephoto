import type { Series, PressItem, ShopItem, Film, ArtistInfo, WritingItem } from '@/types';
import { series as bundledSeries, pressItems as bundledPress, shopItems as bundledShop, films as bundledFilms, artist as bundledArtist, contactInfo as bundledContact, writingItems as bundledWriting } from '@/data/artist';
import type { ContactInfo } from '@/data/artist';

export interface ContentData {
  series: Series[];
  pressItems: PressItem[];
  writingItems: WritingItem[];
  shopItems: ShopItem[];
  films: Film[];
  artist: ArtistInfo;
  contactInfo: ContactInfo;
}

async function fetchApi(): Promise<ContentData | null> {
  try {
    const resp = await fetch('/api/content');
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data || !data.series) return null;
    return {
      series: data.series,
      pressItems: data.pressItems || [],
      writingItems: data.writingItems || [],
      shopItems: data.shopItems || [],
      films: data.films || [],
      artist: data.artist || bundledArtist,
      contactInfo: data.contactInfo || bundledContact,
    };
  } catch {
    return null;
  }
}

export async function fetchCDNContent(): Promise<ContentData | null> {
  return fetchApi();
}

export const initialContent: ContentData = {
  series: bundledSeries,
  pressItems: bundledPress,
  writingItems: bundledWriting,
  shopItems: bundledShop,
  films: bundledFilms,
  artist: bundledArtist,
  contactInfo: bundledContact,
};
