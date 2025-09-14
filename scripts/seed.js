const { pool } = require('../server/config/db');

async function run() {
  await pool.query(`
    create table if not exists events (
      id text primary key,
      name text not null,
      artists text[] not null,
      datetime timestamptz not null,
      venue text not null,
      genre text not null,
      ticket_price numeric not null,
      venue_size text not null,
      image text not null,
      description text not null
    );
  `);

  await pool.query('delete from events;');
  await pool.query(`
    insert into events (id,name,artists,datetime,venue,genre,ticket_price,venue_size,image,description) values
    ('indie-night-campus-hall','Indie Night at Campus Hall',ARRAY['The Dorm Room Poets','Lo-Fi Library'],'2025-09-20T19:30:00','Campus Hall A','Indie',12,'Medium','/assets/images/indie-night.svg','Chill indie bands and acoustic sets to ease into the weekend.'),
    ('hip-hop-showcase-student-center','Hip-Hop Showcase',ARRAY['MC Byte','Cipher Circle','808 Society'],'2025-09-27T20:00:00','Student Center Theater','Hip-Hop',15,'Large','/assets/images/hiphop-showcase.svg','Local hip-hop artists battle and perform original tracks.'),
    ('open-mic-coffeehouse','Open Mic Night',ARRAY['Various Students'],'2025-09-18T18:00:00','Campus Coffeehouse','Acoustic',0,'Small','/assets/images/open-mic.svg','Showcase your talent—poetry, music, or comedy. Free entry.'),
    ('edm-warehouse-rave','EDM Warehouse Rave',ARRAY['DJ NeonPulse','Bass Architects'],'2025-10-04T22:00:00','Old Mill Warehouse','EDM',25,'Large','/assets/images/edm-warehouse.svg','High-energy EDM in an industrial setting. Strobe lights included.'),
    ('fall-fest-green','Fall Fest on the Green',ARRAY['Sunset Collective','Campus Brass','DJ Maple'],'2025-10-12T14:00:00','University Green','Mixed',5,'Outdoor','/assets/images/fall-fest.svg','Outdoor festival with food trucks, art booths, and live acts.')
  `);

  console.log('Seed complete');
  await pool.end();
}

run().catch((e) => { console.error(e); process.exit(1); });


