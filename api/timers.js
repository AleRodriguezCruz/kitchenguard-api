let timers = [
  { id: 1, name: 'Ejemplo: Arroz', duration: 900, createdAt: new Date().toISOString() }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(timers);
  }

  if (req.method === 'POST') {
    const { name, duration } = req.body;
    
    if (!name || !duration) {
      return res.status(400).json({ error: 'Nombre y duración requeridos' });
    }

    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      createdAt: new Date().toISOString()
    };

    timers.push(newTimer);
    return res.status(201).json({ success: true, data: newTimer });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    timers = timers.filter(t => t.id !== parseInt(id));
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}