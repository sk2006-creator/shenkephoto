export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'VERCEL_TOKEN not configured' });
  }

  const teamId = process.env.VERCEL_TEAM_ID || '';
  const queryString = teamId ? `?teamId=${teamId}` : '';

  try {
    const response = await fetch(
      `https://api.vercel.com/v13/deployments${queryString}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'shenkephoto',
          gitSource: {
            type: 'github',
            org: 'sk2006-creator',
            repo: 'shenkephoto',
            ref: 'main',
          },
          target: 'production',
          projectSettings: {
            framework: 'vite',
            buildCommand: 'node node_modules/vite/bin/vite.js build',
            outputDirectory: 'dist',
            installCommand: 'npm install',
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Deploy failed' });
    }

    return res.status(200).json({
      success: true,
      deploymentId: data.id,
      url: data.url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
