export default function handler(req, res) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KitchenGuard API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0A0D14;
      color: #F8FAFC;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 700px;
      width: 100%;
      background: #1A1F2E;
      border: 1px solid #262D3D;
      border-radius: 24px;
      padding: 40px;
      text-align: center;
    }
    .logo {
      margin-bottom: 20px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .accent {
      color: #F97316;
    }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 8px 16px;
      border-radius: 20px;
      margin: 16px 0 24px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: #10B981;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .endpoints {
      text-align: left;
      margin-top: 24px;
    }
    .endpoint {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #111827;
      border: 1px solid #262D3D;
      border-radius: 12px;
      margin-bottom: 8px;
      transition: all 0.2s;
    }
    .endpoint:hover {
      border-color: #F97316;
      background: rgba(249, 115, 22, 0.05);
    }
    .method {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      min-width: 50px;
      text-align: center;
    }
    .get { background: rgba(16, 185, 129, 0.2); color: #10B981; }
    .post { background: rgba(249, 115, 22, 0.2); color: #F97316; }
    .delete { background: rgba(239, 68, 68, 0.2); color: #EF4444; }
    .path {
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #94A3B8;
    }
    .desc {
      font-size: 12px;
      color: #475569;
      margin-left: auto;
    }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #475569;
    }
    a {
      color: #F97316;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .test-section {
      margin-top: 24px;
      padding: 20px;
      background: #111827;
      border: 1px solid #262D3D;
      border-radius: 16px;
      text-align: center;
    }
    .test-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #F97316;
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.2s;
      margin: 8px;
    }
    .test-btn:hover {
      background: #EA580C;
      transform: translateY(-2px);
      text-decoration: none;
    }
    .test-btn.secondary {
      background: #1A1F2E;
      border: 1px solid #323B4E;
    }
    .test-btn.secondary:hover {
      border-color: #F97316;
      color: #F97316;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <svg width="200" height="56" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F97316"/>
            <stop offset="100%" stop-color="#EA580C"/>
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
        <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGrad)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
        </circle>
        <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGrad)"/>
        <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
        <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
      </svg>
    </div>
    <h1>KitchenGuard <span class="accent">API</span></h1>
    <p style="color: #94A3B8; font-size: 14px;">Sistema inteligente de monitoreo de cocina</p>
    
    <div class="status">
      <span class="status-dot"></span>
      <span style="color: #10B981; font-weight: 600; font-size: 13px;">API Operativa</span>
    </div>

    <div class="test-section">
      <p style="color: #94A3B8; font-size: 13px; margin-bottom: 12px;">🧪 Probar API</p>
      <a href="/api/status" class="test-btn">📊 Ver Estado</a>
      <a href="/api/sensor" class="test-btn secondary">📡 Ver Sensores</a>
      <a href="/api/timers" class="test-btn secondary">⏰ Ver Timers</a>
      <a href="/api/panic" class="test-btn secondary">🆘 Ver Pánico</a>
    </div>

    <div class="endpoints">
      <p style="color: #94A3B8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Endpoints Disponibles</p>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/status</span>
        <span class="desc">Estado actual de sensores</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/sensor</span>
        <span class="desc">Historial de sensores</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/sensor</span>
        <span class="desc">Enviar datos de sensor</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/panic</span>
        <span class="desc">Eventos de pánico</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/panic</span>
        <span class="desc">Activar pánico</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/timers</span>
        <span class="desc">Lista de temporizadores</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/timers</span>
        <span class="desc">Crear temporizador</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/register-token</span>
        <span class="desc">Registrar push token</span>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/setup</span>
        <span class="desc">Ver dispositivos</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/setup</span>
        <span class="desc">Configurar dispositivo</span>
      </div>
    </div>

    <div class="footer">
      <p>KitchenGuard API v1.0 • Desplegado en Vercel</p>
      <p style="margin-top: 4px;">
        <a href="https://github.com/TU_USUARIO/kitchenguard-api" target="_blank">GitHub</a> • 
        <a href="https://kitchenguard-six.vercel.app" target="_blank">Web App</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}