module.exports = (req, res) => {
  const host = req.headers.host;
  const redirect_uri = `https://${host}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    redirect_uri: redirect_uri,
    scope: 'repo,user',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};
