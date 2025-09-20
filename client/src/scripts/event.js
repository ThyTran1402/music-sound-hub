async function fetchEvent(id) {
  const res = await fetch(`/api/events/${id}`);
  return res.json();
}

function qs(name) {
  const m = window.location.pathname.match(/\/events\/(.+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

function renderEvent(e) {
  const el = document.getElementById('event');
  el.innerHTML = `
    <header>
      <h1>${e.name}</h1>
      <p class="card-meta">${new Date(e.datetime).toLocaleString()} · ${e.venue}</p>
    </header>
    <img src="${e.image}" alt="${e.name}" style="width:100%;max-height:320px;object-fit:cover;border-radius:12px" />
    <p><strong>Genre:</strong> ${e.genre} · <strong>Price:</strong> ${e.ticketPrice} · <strong>Size:</strong> ${e.venueSize}</p>
    <p>${e.description || ''}</p>
  `;
}

(async function init() {
  const id = qs('id');
  if (!id) return;
  const e = await fetchEvent(id);
  renderEvent(e);
})();

function getIdFromPath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[1];
}

function formatCurrency(amount) {
  if (Number(amount) === 0) return 'Free';
  return `$${Number(amount).toFixed(0)}`;
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

async function loadEvent() {
  const id = getIdFromPath();
  const res = await fetch(`/api/events/${id}`);
  const container = document.getElementById('event-detail');
  if (!res.ok) {
    container.innerHTML = '<p>Event not found.</p>';
    return;
  }
  const e = await res.json();
  container.innerHTML = `
    <header>
      <h1>${e.name}</h1>
      <p><small>${formatDateTime(e.datetime)} · ${e.venue}</small></p>
    </header>
    <img src="${e.image}" alt="${e.name}" style="width:100%;max-height:360px;object-fit:cover;border-radius:8px;" />
    <p>${e.description}</p>
    <ul>
      <li><strong>Artists:</strong> ${e.artists.join(', ')}</li>
      <li><strong>Genre:</strong> ${e.genre}</li>
      <li><strong>Ticket Price:</strong> ${formatCurrency(e.ticketPrice)}</li>
      <li><strong>Venue Size:</strong> ${e.venueSize}</li>
      <li><strong>ID:</strong> ${e.id}</li>
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', loadEvent);



