// Vercel Serverless Function: serves latest content from GitHub raw URLs
// This bypasses jsDelivr CDN caching - always returns fresh data from GitHub
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Cache for 10 seconds on Vercel CDN, allow stale for 30s during revalidation
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');

  const RAW_BASE = 'https://raw.githubusercontent.com/sk2006-creator/shenkephoto/main';

  async function fetchJson(path) {
    try {
      // Add cache-busting to bypass GitHub's CDN cache on raw.githubusercontent.com
      const cacheBuster = Math.floor(Date.now() / 15000); // changes every 15s
      const resp = await fetch(`${RAW_BASE}/${path}?t=${cacheBuster}`, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!resp.ok) return null;
      return await resp.json();
    } catch {
      return null;
    }
  }

  try {
    const manifest = await fetchJson('src/content/manifest.json');
    if (!manifest) {
      res.status(503).json({ error: 'Failed to fetch manifest from GitHub' });
      return;
    }

    const [works, press, writing, shop, films, artist, contact] = await Promise.all([
      Promise.all((manifest.works || []).map(id => fetchJson(`src/content/works/${id}.json`))),
      Promise.all((manifest.press || []).map(id => fetchJson(`src/content/press/${id}.json`))),
      Promise.all((manifest.writing || []).map(id => fetchJson(`src/content/writing/${id}.json`))),
      Promise.all((manifest.shop || []).map(id => fetchJson(`src/content/shop/${id}.json`))),
      Promise.all((manifest.films || []).map(id => fetchJson(`src/content/films/${id}.json`))),
      fetchJson('src/content/artist.json'),
      fetchJson('src/content/contact.json'),
    ]);

    res.status(200).json({
      series: works.filter(Boolean).sort((a, b) => parseInt(b.year) - parseInt(a.year)),
      pressItems: press.filter(Boolean).sort((a, b) => b.date.localeCompare(a.date)),
      writingItems: writing.filter(Boolean).sort((a, b) => b.date.localeCompare(a.date)),
      shopItems: shop.filter(Boolean),
      films: films.filter(Boolean).sort((a, b) => parseInt(b.year) - parseInt(a.year)),
      artist: artist || null,
      contactInfo: contact || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
