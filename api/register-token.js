let pushTokens = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token requerido' });
    }

    // Evitar duplicados
    if (!pushTokens.includes(token)) {
      pushTokens.push(token);
    }

    console.log(`📱 Token registrado: ${token.substring(0, 20)}...`);
    console.log(`📊 Total tokens: ${pushTokens.length}`);

    return res.status(200).json({ success: true, total: pushTokens.length });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}