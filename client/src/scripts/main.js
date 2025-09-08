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



