export default async function handler(req, res) {
  const host = req.headers.host || 'shenkephoto.vercel.app';
  const origin = `https://${host}`;
  const redirect_uri = `${origin}/api/auth/callback`;
  const client_id = process.env.OAUTH_CLIENT_ID;
  const client_secret = process.env.OAUTH_CLIENT_SECRET;

  const code = req.query.code || null;
  const error = req.query.error || null;
  const error_description = req.query.error_description || null;

  // Helper: send postMessage to parent window and close popup
  function sendResult(type, data) {
    const msg = type === 'success'
      ? 'authorization:github:success:' + JSON.stringify(data)
      : 'authorization:github:error:' + JSON.stringify(data);

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${type === 'success' ? 'Login Complete' : 'Login Error'}</title>
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 60px 20px; color: #333; background: #fafafa; }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h2 { font-weight: 400; margin-bottom: 8px; }
    p { color: #666; font-size: 14px; }
    .spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #ddd; border-top-color: #333; border-radius: 50%; animation: spin 0.8s linear infinite; margin-top: 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  ${type === 'success' ? '<div class="spinner"></div><h2>登录成功</h2><p>正在返回管理后台...</p>' : '<div class="icon">⚠️</div><h2>登录失败</h2><p>' + (data.message || '未知错误') + '</p>'}
  <script>
    (function() {
      var origin = ${JSON.stringify(origin)};
      var msg = ${JSON.stringify(msg)};
      try {
        window.opener.postMessage(msg, origin);
      } catch(e) {
        console.error('postMessage failed:', e);
      }
      setTimeout(function() { window.close(); }, 1000);
    })();
  </script>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(html);
  }

  // Handle OAuth error from GitHub
  if (error) {
    return sendResult('error', { message: error + ': ' + (error_description || '') });
  }

  // No code parameter
  if (!code) {
    return sendResult('error', { message: 'Missing authorization code' });
  }

  // Exchange code for access token
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'shenkephoto-cms',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return sendResult('error', { message: tokenData.error + ': ' + (tokenData.error_description || '') });
    }

    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return sendResult('error', { message: 'No access token received from GitHub' });
    }

    // Success! Send token to parent window via postMessage
    return sendResult('success', { token: accessToken, provider: 'github' });
  } catch (err) {
    return sendResult('error', { message: 'Server error: ' + err.message });
  }
}
