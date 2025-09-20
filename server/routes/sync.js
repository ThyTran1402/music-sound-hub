const { Router } = require('express');
const { pool } = require('../config/db');
const fetch = require('node:https').request ? require('node-fetch') : null;

const router = Router();

async function getJson(url) {
  const res = await (global.fetch ? fetch(url) : (await import('node-fetch')).then(m => m.default(url)));
  if (!res.ok) throw new Error(`Upstream error ${res.status}`);
  return res.json();
}

router.post('/ticketmaster', async (req, res) => {
  try {
    const apiKey = process.env.TICKETMASTER_API_KEY;
    if (!apiKey) return res.status(400).json({ error: 'Missing TICKETMASTER_API_KEY' });

    const lat = req.query.lat || '34.0522';
    const lng = req.query.lng || '-118.2437';
    const radius = req.query.radius || '25';
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 45);
    const startIso = start.toISOString();
    const endIso = end.toISOString();

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&latlong=${lat},${lng}&radius=${radius}&unit=miles&startDateTime=${encodeURIComponent(startIso)}&endDateTime=${encodeURIComponent(endIso)}&apikey=${apiKey}`;

    const data = await getJson(url);
    const events = (data?._embedded?.events || []).map(e => {
      const id = `tm_${e.id}`;
      const name = e.name;
      const artists = (e._embedded?.attractions || []).map(a => a.name);
      const datetime = e.dates?.start?.dateTime || e.dates?.start?.localDate;
      const venue = e._embedded?.venues?.[0]?.name || 'Unknown Venue';
      const genre = e.classifications?.[0]?.genre?.name || 'Mixed';
      const price = (e.priceRanges && e.priceRanges[0]?.min) || 0;
      const venueSize = 'Medium';
      const image = (e.images || []).find(i => i.ratio === '16_9')?.url || (e.images?.[0]?.url) || '/assets/images/edm-warehouse.svg';
      const description = e?.pleaseNote || e?.info || '';
      const v = e._embedded?.venues?.[0] || {};
      const location_slug = (v.name || 'venue').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const location_name = v.name || 'Venue';
      const latNum = v.location?.latitude ? Number(v.location.latitude) : null;
      const lngNum = v.location?.longitude ? Number(v.location.longitude) : null;
      return { id, name, artists, datetime, venue, genre, ticket_price: price, venue_size: venueSize, image, description, location_slug, location_name, lat: latNum, lng: lngNum };
    });

    const client = await pool.connect();
    try {
      const text = `
        insert into events (id, name, artists, datetime, venue, genre, ticket_price, venue_size, image, description, location_slug, location_name, lat, lng)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        on conflict (id) do update set
          name=excluded.name,
          artists=excluded.artists,
          datetime=excluded.datetime,
          venue=excluded.venue,
          genre=excluded.genre,
          ticket_price=excluded.ticket_price,
          venue_size=excluded.venue_size,
          image=excluded.image,
          description=excluded.description,
          location_slug=excluded.location_slug,
          location_name=excluded.location_name,
          lat=excluded.lat,
          lng=excluded.lng
      `;
      for (const ev of events) {
        const vals = [ev.id, ev.name, ev.artists, ev.datetime, ev.venue, ev.genre, ev.ticket_price, ev.venue_size, ev.image, ev.description, ev.location_slug, ev.location_name, ev.lat, ev.lng];
        await client.query(text, vals);
      }
    } finally {
      client.release();
    }

    res.json({ upserted: events.length });
  } catch (err) {
    console.error('Ticketmaster sync failed', err);
    res.status(500).json({ error: 'Sync failed' });
  }
});

module.exports = router;


