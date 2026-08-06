import type { Series, PressItem, ShopItem, Film, ArtistInfo } from '@/types';
import { series as bundledSeries, pressItems as bundledPress, shopItems as bundledShop, films as bundledFilms, artist as bundledArtist, contactInfo as bundledContact } from '@/data/artist';
import type { ContactInfo } from '@/data/artist';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/sk2006-creator/shenkephoto@main';
const CACHE_BUSTER = () => `?t=${Math.floor(Date.now() / 300000)}`; // 5-minute cache window

export interface ContentData {
  series: Series[];
  pressItems: PressItem[];
  shopItems: ShopItem[];
  films: Film[];
  artist: ArtistInfo;
  contactInfo: ContactInfo;
}

async function fetchJson(url: string): Promise<any | null> {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

export async function fetchCDNContent(): Promise<ContentData | null> {
  try {
    // Fetch manifest
    const manifest = await fetchJson(`${CDN_BASE}/src/content/manifest.json${CACHE_BUSTER()}`);
    if (!manifest) return null;

    // Fetch all content in parallel
    const [worksResults, pressResults, shopResults, filmsResults, artistData, contactData] = await Promise.all([
      Promise.all((manifest.works || []).map((id: string) => fetchJson(`${CDN_BASE}/src/content/works/${id}.json${CACHE_BUSTER()}`))),
      Promise.all((manifest.press || []).map((id: string) => fetchJson(`${CDN_BASE}/src/content/press/${id}.json${CACHE_BUSTER()}`))),
      Promise.all((manifest.shop || []).map((id: string) => fetchJson(`${CDN_BASE}/src/content/shop/${id}.json${CACHE_BUSTER()}`))),
      Promise.all((manifest.films || []).map((id: string) => fetchJson(`${CDN_BASE}/src/content/films/${id}.json${CACHE_BUSTER()}`))),
      fetchJson(`${CDN_BASE}/src/content/artist.json${CACHE_BUSTER()}`),
      fetchJson(`${CDN_BASE}/src/content/contact.json${CACHE_BUSTER()}`),
    ]);

    // Filter nulls and sort
    const series = worksResults.filter(Boolean).sort((a, b) => parseInt(b.year) - parseInt(a.year));
    const pressItems = pressResults.filter(Boolean).sort((a, b) => b.date.localeCompare(a.date));
    const shopItems = shopResults.filter(Boolean);
    const films = filmsResults.filter(Boolean).sort((a, b) => parseInt(b.year) - parseInt(a.year));

    return {
      series: series.length ? series : bundledSeries,
      pressItems: pressItems.length ? pressItems : bundledPress,
      shopItems: shopItems.length ? shopItems : bundledShop,
      films: films.length ? films : bundledFilms,
      artist: artistData || bundledArtist,
      contactInfo: contactData || bundledContact,
    };
  } catch {
    return null;
  }
}

export const initialContent: ContentData = {
  series: bundledSeries,
  pressItems: bundledPress,
  shopItems: bundledShop,
  films: bundledFilms,
  artist: bundledArtist,
  contactInfo: bundledContact,
};
