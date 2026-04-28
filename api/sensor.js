let sensorData = [];
let currentStatus = {
  stove_on: false,
  gas_level: 12,
  temperature: 24,
  humidity: 55,
  panic: false,
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Devolver historial de sensores
    return res.status(200).json(sensorData.slice(-50));
  }

  if (req.method === 'POST') {
    const { type, value, alert } = req.body;
    
    const newSensor = {
      id: Date.now(),
      type: type || 'gas',
      value: value || 0,
      alert: alert || 0,
      timestamp: new Date().toISOString()
    };

    sensorData.push(newSensor);
    if (sensorData.length > 100) sensorData.shift();

    // Actualizar estado actual
    if (type === 'gas') {
      currentStatus.gas_level = value;
      currentStatus.stove_on = alert === 1;
    }
    if (type === 'temperature') currentStatus.temperature = value;
    if (type === 'humidity') currentStatus.humidity = value;

    return res.status(200).json({ success: true, data: newSensor });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}