const express = require('express');
const path = require('path');

const eventsRouter = require('./routes/events');
const syncRouter = require('./routes/sync');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend from client/src
const staticDir = path.join(__dirname, '..', 'client', 'src');
app.use(express.static(staticDir, { index: 'index.html' }));
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'src', 'assets')));

// API routes
app.use('/api', eventsRouter);
app.use('/api/sync', syncRouter);

// Static page routes
app.get('/events/:id', (req, res) => {
  res.sendFile(path.join(staticDir, 'event.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(staticDir, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


