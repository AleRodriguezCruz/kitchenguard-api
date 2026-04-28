// Simulación de base de datos en memoria
// En producción, conectarías con Supabase o MongoDB
let currentStatus = {
  stove_on: false,
  gas_level: 12,
  temperature: 24,
  humidity: 55,
  panic: false,
  lastUpdate: new Date().toISOString()
};

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Simular variación de datos
    currentStatus.gas_level = Math.max(0, Math.min(100, currentStatus.gas_level + (Math.random() - 0.5) * 5));
    currentStatus.temperature = Math.round((currentStatus.temperature + (Math.random() - 0.5) * 2) * 10) / 10;
    currentStatus.humidity = Math.max(0, Math.min(100, currentStatus.humidity + (Math.random() - 0.5) * 3));
    currentStatus.lastUpdate = new Date().toISOString();

    return res.status(200).json(currentStatus);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}