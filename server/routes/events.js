const { Router } = require('express');
const { events } = require('../data/events');

const router = Router();

router.get('/events', (req, res) => {
  const { genre, maxPrice, venueSize } = req.query;
  let filtered = [...events];
  if (genre) filtered = filtered.filter((e) => e.genre.toLowerCase() === String(genre).toLowerCase());
  if (maxPrice) filtered = filtered.filter((e) => Number(e.ticketPrice) <= Number(maxPrice));
  if (venueSize) filtered = filtered.filter((e) => e.venueSize.toLowerCase() === String(venueSize).toLowerCase());
  res.json(filtered);
});

router.get('/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

module.exports = router;


