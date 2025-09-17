async function fetchEvents(params = {}) {
  const url = new URL('/api/events', window.location.origin);
  Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  const res = await fetch(url);
  return res.json();
}

function countdown(iso) {
  const ms = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(ms);
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { ms, label: `${ms < 0 ? '-' : ''}${days}d ${hours}h` };
}

function imageFor(e) {
  const g = (e.genre || '').toLowerCase();
  if (g === 'edm') return '/assets/images/edm-warehouse.svg';
  if (g === 'hip-hop') return '/assets/images/hiphop-showcase.svg';
  if (g === 'indie' || g === 'acoustic') return '/assets/images/indie-night.svg';
  return '/assets/images/fall-fest.svg';
}

function renderEvents(list) {
  const container = document.getElementById('events');
  container.innerHTML = list.map(e => {
    const cd = countdown(e.datetime);
    return `
      <article class="card ${cd.ms < 0 ? 'is-past' : ''}">
        <img src="${imageFor(e)}" alt="${e.name}" />
        <span class="flash-ribbon">${cd.ms < 0 ? 'Ended' : `Starts in ${cd.label}`}</span>
        <div class="card-body">
          <div class="card-title">${e.name}</div>
          <p class="card-meta">${new Date(e.datetime).toLocaleString()} · ${e.venue}</p>
          <p><strong>Genre:</strong> ${e.genre} · <strong>Price:</strong> ${e.ticketPrice} · <strong>Size:</strong> ${e.venueSize}</p>
          <div class="card-footer">
            <a href="/events/${e.id}" role="button">Details</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

document.getElementById('filters')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const genre = document.getElementById('genre').value;
  const maxPrice = document.getElementById('maxPrice').value;
  const venueSize = document.getElementById('venueSize').value;
  const events = await fetchEvents({ genre, maxPrice, venueSize });
  renderEvents(events);
});

(async function init() {
  const events = await fetchEvents();
  renderEvents(events);
})();

async function fetchEvents(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/events${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to load events');
  return res.json();
}

function formatCurrency(amount) {
  if (Number(amount) === 0) return 'Free';
  return `$${Number(amount).toFixed(0)}`;
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function renderEvents(container, events) {
  container.innerHTML = events
    .map(
      (e) => `
      <div class="card">
        <img src="${e.image}" alt="${e.name}" />
        <div class="card-body">
          <div class="card-title">${e.name}</div>
          <p class="card-meta">${formatDateTime(e.datetime)} · ${e.venue}</p>
          <p><strong>Artists:</strong> ${e.artists.join(', ')}</p>
          <p><strong>Genre:</strong> ${e.genre} · <strong>Price:</strong> ${formatCurrency(e.ticketPrice)} · <strong>Size:</strong> ${e.venueSize}</p>
          <div class="card-footer">
            <a href="/events/${e.id}" role="button">View details</a>
          </div>
        </div>
      </div>`
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const listEl = document.getElementById('events');
  const form = document.getElementById('filters');
  const genre = document.getElementById('genre');
  const maxPrice = document.getElementById('maxPrice');
  const venueSize = document.getElementById('venueSize');

  async function load() {
    const params = {};
    if (genre.value) params.genre = genre.value;
    if (maxPrice.value) params.maxPrice = maxPrice.value;
    if (venueSize.value) params.venueSize = venueSize.value;
    const data = await fetchEvents(params);
    renderEvents(listEl, data);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    load();
  });

  load();
});



