const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory data for events
const events = [
  {
    id: 'indie-night-campus-hall',
    name: 'Indie Night at Campus Hall',
    artists: ['The Dorm Room Poets', 'Lo-Fi Library'],
    datetime: '2025-09-20T19:30:00',
    venue: 'Campus Hall A',
    genre: 'Indie',
    ticketPrice: 12,
    venueSize: 'Medium',
    image: '/images/indie-night.jpg',
    description: 'Chill indie bands and acoustic sets to ease into the weekend.'
  },
  {
    id: 'hip-hop-showcase-student-center',
    name: 'Hip-Hop Showcase',
    artists: ['MC Byte', 'Cipher Circle', '808 Society'],
    datetime: '2025-09-27T20:00:00',
    venue: 'Student Center Theater',
    genre: 'Hip-Hop',
    ticketPrice: 15,
    venueSize: 'Large',
    image: '/images/hiphop-showcase.jpg',
    description: 'Local hip-hop artists battle and perform original tracks.'
  },
  {
    id: 'open-mic-coffeehouse',
    name: 'Open Mic Night',
    artists: ['Various Students'],
    datetime: '2025-09-18T18:00:00',
    venue: 'Campus Coffeehouse',
    genre: 'Acoustic',
    ticketPrice: 0,
    venueSize: 'Small',
    image: '/images/open-mic.jpg',
    description: 'Showcase your talent—poetry, music, or comedy. Free entry.'
  },
  {
    id: 'edm-warehouse-rave',
    name: 'EDM Warehouse Rave',
    artists: ['DJ NeonPulse', 'Bass Architects'],
    datetime: '2025-10-04T22:00:00',
    venue: 'Old Mill Warehouse',
    genre: 'EDM',
    ticketPrice: 25,
    venueSize: 'Large',
    image: '/images/edm-warehouse.jpg',
    description: 'High-energy EDM in an industrial setting. Strobe lights included.'
  },
  {
    id: 'fall-fest-green',
    name: 'Fall Fest on the Green',
    artists: ['Sunset Collective', 'Campus Brass', 'DJ Maple'],
    datetime: '2025-10-12T14:00:00',
    venue: 'University Green',
    genre: 'Mixed',
    ticketPrice: 5,
    venueSize: 'Outdoor',
    image: '/images/fall-fest.jpg',
    description: 'Outdoor festival with food trucks, art booths, and live acts.'
  }
];

app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/events', (req, res) => {
  // Support basic filtering by genre, maxPrice, and venueSize via query params
  const { genre, maxPrice, venueSize } = req.query;
  let filtered = events;
  if (genre) {
    filtered = filtered.filter((e) => e.genre.toLowerCase() === String(genre).toLowerCase());
  }
  if (maxPrice) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      filtered = filtered.filter((e) => Number(e.ticketPrice) <= max);
    }
  }
  if (venueSize) {
    filtered = filtered.filter((e) => e.venueSize.toLowerCase() === String(venueSize).toLowerCase());
  }
  res.json(filtered);
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// Server-rendered detail view routes for unique endpoints
app.get('/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  return res.sendFile(path.join(__dirname, 'public', 'event.html'));
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 for all other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app, events };



