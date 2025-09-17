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
      description text not null,
      location_slug text,
      location_name text,
      lat numeric,
      lng numeric
    );
  `);

  // Ensure columns exist for previously created tables
  await pool.query(`alter table events add column if not exists location_slug text;`);
  await pool.query(`alter table events add column if not exists location_name text;`);
  await pool.query(`alter table events add column if not exists lat numeric;`);
  await pool.query(`alter table events add column if not exists lng numeric;`);

  await pool.query('delete from events;');
  await pool.query(`
    insert into events (id,name,artists,datetime,venue,genre,ticket_price,venue_size,image,description,location_slug,location_name,lat,lng) values
    ('indie-night-campus-hall','Indie Night at Campus Hall',ARRAY['The Dorm Room Poets','Lo-Fi Library'],'2025-09-20T19:30:00','Campus Hall A','Indie',12,'Medium','/assets/images/edm-warehouse.svg','Chill indie bands and acoustic sets to ease into the weekend.','campus-hall','Campus Hall Area',37.8715,-122.2730),
    ('hip-hop-showcase-student-center','Hip-Hop Showcase',ARRAY['MC Byte','Cipher Circle','808 Society'],'2025-09-27T20:00:00','Student Center Theater','Hip-Hop',15,'Large','/assets/images/edm-warehouse.svg','Local hip-hop artists battle and perform original tracks.','student-center','Student Center',34.0522,-118.2437),
    ('open-mic-coffeehouse','Open Mic Night',ARRAY['Various Students'],'2025-09-18T18:00:00','Campus Coffeehouse','Acoustic',0,'Small','/assets/images/edm-warehouse.svg','Showcase your talent—poetry, music, or comedy. Free entry.','north-green','North Green',40.7128,-74.0060),
    ('edm-warehouse-rave','EDM Warehouse Rave',ARRAY['DJ NeonPulse','Bass Architects'],'2025-10-04T22:00:00','Old Mill Warehouse','EDM',25,'Large','/assets/images/edm-warehouse.svg','High-energy EDM in an industrial setting. Strobe lights included.','warehouse-district','Warehouse District',47.6062,-122.3321),
    ('fall-fest-green','Fall Fest on the Green',ARRAY['Sunset Collective','Campus Brass','DJ Maple'],'2025-10-12T14:00:00','University Green','Mixed',5,'Outdoor','/assets/images/edm-warehouse.svg','Outdoor festival with food trucks, art booths, and live acts.','central-green','Central Green',36.1699,-115.1398)
  `);

  console.log('Seed complete');
  await pool.end();
}

run().catch((e) => { console.error(e); process.exit(1); });


