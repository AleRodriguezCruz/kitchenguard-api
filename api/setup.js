let devices = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { code } = req.query;
    if (code) {
      const device = devices.find(d => d.code === code);
      return res.status(200).json(device || { error: 'Dispositivo no encontrado' });
    }
    return res.status(200).json(devices);
  }

  if (req.method === 'POST') {
    const { code, wifiSSID, wifiPassword, userId } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Código del dispositivo requerido' });
    }

    const device = {
      code,
      wifiSSID: wifiSSID || null,
      configured: true,
      configuredAt: new Date().toISOString(),
      userId: userId || null
    };

    // Actualizar o crear
    const index = devices.findIndex(d => d.code === code);
    if (index >= 0) {
      devices[index] = { ...devices[index], ...device };
    } else {
      devices.push(device);
    }

    return res.status(200).json({ success: true, data: device });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}