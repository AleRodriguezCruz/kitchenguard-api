let panicEvents = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(panicEvents.slice(-20));
  }

  if (req.method === 'POST') {
    const panicEvent = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      location: req.body?.location || 'unknown'
    };
    
    panicEvents.push(panicEvent);
    if (panicEvents.length > 100) panicEvents.shift();

    return res.status(200).json({ success: true, data: panicEvent });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}