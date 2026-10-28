const express = require('express');
const app = express();
const PORT = 3000;

// Built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware 1: Logger - logs every request (request–response cycle visibility)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // Pass control to next middleware/route
});

// Custom middleware 2: Request time middleware
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// Route 1: GET / - Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Basic Express.js App</h1>
    <p>This app demonstrates routing, middleware, and the request–response cycle.</p>
    <ul>
      <li><a href="/about">GET /about</a></li>
      <li><a href="/api/users">GET /api/users</a></li>
      <li><a href="/time">GET /time</a></li>
    </ul>
  `);
});

// Route 2: GET /about - Static route
app.get('/about', (req, res) => {
  res.json({
    message: 'About Page',
    description: 'Express.js app showing routing and middleware concepts',
    timestamp: new Date().toISOString()
  });
});

// Route 3: GET /time - Shows middleware data
app.get('/time', (req, res) => {
  const responseTime = Date.now() - req.requestTime;
  res.json({
    message: 'Request processed',
    requestTime: new Date(req.requestTime).toISOString(),
    responseTimeMs: responseTime
  });
});

// Route 4: GET /api/users - API route with params example
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];
  res.json({ users });
});

// Route 5: GET /api/users/:id - Route with URL parameters
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({
    user: { id: userId, name: `User ${userId}` },
    params: req.params
  });
});

// Route 6: POST /api/users - POST route to demonstrate request body
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({
    message: 'User created',
    user: { id: 4, name: name || 'New User' },
    body: req.body
  });
});

// 404 Middleware - handles undefined routes (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} does not exist`
  });
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Demonstrating: Routing | Middleware | Request-Response Cycle');
});
