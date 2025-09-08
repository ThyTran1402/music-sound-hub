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
    image: '/assets/images/indie-night.svg',
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
    image: '/assets/images/hiphop-showcase.svg',
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
    image: '/assets/images/open-mic.svg',
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
    image: '/assets/images/edm-warehouse.svg',
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
    image: '/assets/images/fall-fest.svg',
    description: 'Outdoor festival with food trucks, art booths, and live acts.'
  }
];

module.exports = { events };


