# WEB103 Project 1 - *Music Sound Hub*

Submitted by: **Thy Tran**

About this web app: **Music Sound Hub helps students discover live music around their campus. Browse a curated list of upcoming concerts, open mic nights, and festivals, filter by genre, ticket price, or venue size, and click any card to view a dedicated detail page with full info (artists, date/time, venue, genre, and price). The app features a PostgreSQL database backend with location-based event filtering, real-time countdown timers, and integration with external music APIs for live event data. Built with Express.js, vanilla HTML/CSS/JS, and Pico CSS styling.**

Time spent: **8** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [X] **The web app displays a title**
- [X] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [X] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [X] **Each detail view should be a unique endpoint, such as as `localhost:3000/events/indie-night-campus-hall` and `localhost:3000/events/edm-warehouse-rave`**
  - [X] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation* 
- [X] **The web app serves an appropriate 404 page when no matching route is defined**
- [X] **The web app is styled using Picocss**
- [X] **The web app is connected to a PostgreSQL database with an appropriately structured events table**

The following **optional** features are implemented:

- [X] **The web app displays items in a unique format, such as cards rather than lists or animated list items**

The following **additional** features are implemented:

- [X] **PostgreSQL Database Integration**: Full database backend with proper schema and data persistence
- [X] **Location-Based Event Filtering**: Events are organized by location with dedicated location pages
- [X] **Real-Time Countdown Timers**: Live countdown showing time remaining until each event
- [X] **Past Event Styling**: Events that have passed are visually distinguished with grayscale styling
- [X] **Interactive Card Design**: Modern flashcard-style event cards with hover effects and smooth animations
- [X] **Advanced Filtering**: Filter events by genre, ticket price, and venue size
- [X] **External API Integration**: Ticketmaster API sync for live event data (with API key configuration)
- [X] **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- [X] **Database Seeding**: Automated database setup with sample event data
- [X] **RESTful API**: Clean API endpoints for events and locations (`/api/events`, `/api/locations`)
- [X] **Error Handling**: Proper 404 pages and API error responses

## Video Walkthrough

**Note: please be sure to 

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  Add GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Technical Implementation

### Database Schema
The PostgreSQL database includes an `events` table with the following structure:
- `id` (text, primary key)
- `name` (text) - Event name
- `artists` (text[]) - Array of performing artists
- `datetime` (timestamptz) - Event date and time
- `venue` (text) - Venue name
- `genre` (text) - Music genre
- `ticket_price` (numeric) - Ticket price
- `venue_size` (text) - Size category (Small/Medium/Large/Outdoor)
- `image` (text) - Image URL
- `description` (text) - Event description
- `location_slug` (text) - URL-friendly location identifier
- `location_name` (text) - Human-readable location name
- `lat` (numeric) - Latitude coordinate
- `lng` (numeric) - Longitude coordinate

### API Endpoints
- `GET /api/events` - List all events with optional filtering
- `GET /api/events/:id` - Get specific event details
- `GET /api/locations` - List all unique locations
- `GET /api/locations/:slug/events` - Get events for a specific location
- `POST /api/sync/ticketmaster` - Sync live events from Ticketmaster API

### Project Structure
```
project1/
├── client/src/           # Frontend static files
│   ├── index.html        # Main page
│   ├── event.html        # Event detail page
│   ├── 404.html          # Error page
│   ├── css/styles.css    # Custom styling
│   ├── scripts/          # JavaScript files
│   └── assets/images/    # Image assets
├── server/               # Backend Express server
│   ├── index.js          # Main server file
│   ├── config/db.js      # Database configuration
│   └── routes/           # API route handlers
├── scripts/seed.js       # Database seeding script
└── package.json          # Dependencies and scripts
```

## Notes



### Key Features
- **Real-time Updates**: Countdown timers update every second using JavaScript intervals
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Database Seeding**: Automated setup with sample data for immediate testing
- **External API Ready**: Prepared for live event data synchronization
- **Error Handling**: Comprehensive 404 pages and API error responses

## License

Copyright [2025] [Thy Tran made with ❤️]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


