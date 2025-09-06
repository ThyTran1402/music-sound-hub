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



