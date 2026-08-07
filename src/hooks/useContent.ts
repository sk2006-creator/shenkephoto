import { useState, useEffect, useCallback } from 'react';
import { fetchCDNContent, initialContent } from '@/data/cdn';
import type { ContentData } from '@/data/cdn';

// Module-level cache with time-based expiry — auto-refreshes after 30s
let cdnCache: ContentData | null = null;
let lastFetchTime = 0;
let fetchPromise: Promise<ContentData | null> | null = null;
const CACHE_MAX_AGE = 30000; // 30 seconds

function ensureCDNFetch(force = false): Promise<ContentData | null> {
  const now = Date.now();
  if (!force && cdnCache && (now - lastFetchTime < CACHE_MAX_AGE)) {
    return Promise.resolve(cdnCache);
  }
  if (!fetchPromise) {
    fetchPromise = fetchCDNContent().then(data => {
      if (data) {
        cdnCache = data;
        lastFetchTime = Date.now();
      }
      fetchPromise = null;
      return data;
    }).catch(() => {
      fetchPromise = null;
      return null;
    });
  }
  return fetchPromise;
}

export function useContent(): ContentData & { refresh: () => void } {
  const [data, setData] = useState<ContentData>(cdnCache || initialContent);

  const refresh = useCallback(() => {
    ensureCDNFetch(true).then(cdnData => {
      if (cdnData) setData(cdnData);
    });
  }, []);

  useEffect(() => {
    const shouldRefetch = !cdnCache || (Date.now() - lastFetchTime > CACHE_MAX_AGE);
    if (shouldRefetch) {
      ensureCDNFetch(true).then(cdnData => {
        if (cdnData) setData(cdnData);
      });
    } else if (cdnCache) {
      setData(cdnCache);
    }
  }, []);

  return { ...data, refresh };
}
