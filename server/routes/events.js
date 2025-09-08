const { Router } = require('express');
const { pool } = require('../config/db');

const router = Router();

router.get('/events', async (req, res) => {
  const { genre, maxPrice, venueSize } = req.query;
  const clauses = [];
  const params = [];
  if (genre) { params.push(genre); clauses.push(`lower(genre)=lower($${params.length})`); }
  if (maxPrice) { params.push(Number(maxPrice)); clauses.push(`ticket_price <= $${params.length}`); }
  if (venueSize) { params.push(venueSize); clauses.push(`lower(venue_size)=lower($${params.length})`); }
  const where = clauses.length ? `where ${clauses.join(' and ')}` : '';
  const sql = `select id,name,artists,datetime,venue,genre,ticket_price as "ticketPrice",venue_size as "venueSize",image,description from events ${where} order by datetime asc`;
  const { rows } = await pool.query(sql, params);
  res.json(rows);
});

router.get('/events/:id', async (req, res) => {
  const { rows } = await pool.query(
    `select id,name,artists,datetime,venue,genre,ticket_price as "ticketPrice",venue_size as "venueSize",image,description from events where id=$1`,
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Event not found' });
  res.json(rows[0]);
});

module.exports = router;


