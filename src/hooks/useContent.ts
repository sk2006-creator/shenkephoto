import { useState, useEffect } from 'react';
import { fetchCDNContent, initialContent } from '@/data/cdn';
import type { ContentData } from '@/data/cdn';

// Module-level cache: CDN data is fetched only once across all components
let cdnCache: ContentData | null = null;
let fetchPromise: Promise<ContentData | null> | null = null;

function ensureCDNFetch(): Promise<ContentData | null> {
  if (cdnCache) return Promise.resolve(cdnCache);
  if (!fetchPromise) {
    fetchPromise = fetchCDNContent().then(data => {
      if (data) cdnCache = data;
      fetchPromise = null;
      return data;
    });
  }
  return fetchPromise;
}

export function useContent(): ContentData {
  const [data, setData] = useState<ContentData>(cdnCache || initialContent);

  useEffect(() => {
    if (cdnCache) { setData(cdnCache); return; }
    ensureCDNFetch().then(cdnData => {
      if (cdnData) setData(cdnData);
    });
  }, []);

  return data;
}
