export default async function handler(req, res) {
  const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  const host = req.headers.host || 'shenkephoto.vercel.app';
  const origin = `https://${host}`;
  const redirectUri = `${origin}/api/auth/callback`;
  const SCOPE = 'repo,user';

  if (!CLIENT_ID) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send('<h1>Configuration Error</h1><p>OAUTH_CLIENT_ID not set.</p>');
  }

  // Generate a random state for CSRF protection
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Build the GitHub OAuth URL
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    scope: SCOPE,
    state: state,
  });

  const oauthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  // Immediately redirect the popup to GitHub OAuth
  // No intermediate page, no delay
  res.setHeader('Location', oauthUrl);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(302).send('');
}
