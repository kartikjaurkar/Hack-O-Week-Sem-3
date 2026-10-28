const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  const sendHTML = (statusCode, html) => {
    res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  };

  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data, null, 2));
  };

  if (method === 'GET') {
    if (pathname === '/') {
      return sendHTML(200, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <style>body{font-family:Arial;margin:40px;background:#f7f9fc}.card{background:#fff;padding:30px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1);max-width:600px}nav a{margin-right:15px;color:#0077ff;text-decoration:none}</style>
</head>
<body>
  <div class="card">
    <h1>Welcome to My Improved HTTP Server</h1>
    <p>Better routing, JSON APIs, logging, and cleaner structure.</p>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/api/info">API Info</a>
      <a href="/api/health">API Health</a>
    </nav>
  </div>
</body>
</html>`);
    }

    if (pathname === '/about') {
      return sendHTML(200, `<!DOCTYPE html><html><head><meta charset="utf-8"><title>About</title></head><body><h1>About</h1><p>Built with Node.js built-in http & url modules.</p><a href="/">Back</a></body></html>`);
    }

    if (pathname === '/contact') {
      return sendHTML(200, `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Contact</title></head><body><h1>Contact</h1><p>Email: example@example.com</p><p>Phone: +1234567890</p><a href="/">Back</a></body></html>`);
    }

    if (pathname === '/api/info') {
      return sendJSON(200, {
        server: "Node.js HTTP Server",
        status: "online",
        method,
        path: pathname,
        query: parsedUrl.query,
        timestamp: new Date().toISOString()
      });
    }

    if (pathname === '/api/health') {
      return sendJSON(200, { status: "healthy", uptime: process.uptime() });
    }
  }

  sendHTML(404, `<!DOCTYPE html><html><head><meta charset="utf-8"><title>404</title></head><body><h1>404 - Not Found</h1><p>${method} ${pathname} does not exist.</p><a href="/">Go Home</a></body></html>`);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
