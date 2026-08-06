export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Missing authorization code');
    return;
  }

  const host = req.headers.host;
  const redirect_uri = `https://${host}/api/auth/callback`;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code: code,
        redirect_uri: redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      res.redirect(`/?access_token=${data.access_token}`);
    } else {
      res.status(500).send('Authentication failed: ' + JSON.stringify(data));
    }
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
}
