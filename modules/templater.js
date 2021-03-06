'use strict';

/* example data

{
  dayName: 'Wednesday',
  dayNum: 30,
  month: 'July',
  holidays: [
    'Happy National Cheesecake Day',
    'Happy Father-in-Law Day',
    'Happy International Day of\n      Friendship'
  ],
  events: [
    {
      artist: 'Peekskill Film Festival Day 2community',
      venue: 'Paramount Hudson Valley',
      url: 'http://paramounthudsonvalley.com/events/',
      day: 'Wednesday',
      time: '10:00 AM'
    },
    {
      artist: 'Rocky Horror Picture Show- 8PM',
      venue: 'Paramount Hudson Valley',
      url: 'http://paramounthudsonvalley.com/events/',
      day: 'Wednesday',
      time: '8:00 PM'
    },
    {
      artist: 'Rocky Horror Picture Show- 11PM',
      venue: 'Paramount Hudson Valley',
      url: 'http://paramounthudsonvalley.com/events/',
      day: 'Wednesday',
      time: '11:00 PM'
    }
  ]
}
*/

let tmpl = ``;

const macheteKaraoke = `
• <strong>Karaoke Night</strong>
with Tina Machete
@ <a href="http://gleasonspeekskill.com/" target="_blank" rel="noopener noreferrer">Gleason's</a> - 9:00 pm
`;

const summerMarket = `
<!-- SUMMER FARMERS MARKET -->
• <strong><a href="http://peekskillfarmersmarket.com/" target="_blank" rel="noopener">The Peekskill Farmer's Market</a></strong>
OUTDoors @ <a href="https://www.google.com/maps/place/1+Bank+St,+Peekskill,+NY+10566">1 Bank Street</a>, 8 am - 2 pm, every Saturday thru Nov 17th.
`;

const winterMarket = `
<!-- WINTER FARMERS MARKET -->
• <strong><a href="http://peekskillfarmersmarket.com/" target="_blank" rel="noopener">The Peekskill Winter Farmer's Market</a></strong>
@ <a href="https://www.google.com/maps/place/925+South+St,+Peekskill,+NY+10566">925 South Street</a>, 10 am - 2 pm, every Saturday Jan 19 - Apr 27.
`;

const determineMarketSeason = () => {
  const date  = new Date();
  const tmpMonth = date.getMonth();
  const month = tmpMonth + 1;

  // if month is after April it's summer market
  if (month > 4)
    return summerMarket
  else {
    return winterMarket;
  }
};

const farmersMarket = determineMarketSeason();

const footer = `

<hr />

<h5>Local Markets and Other Recurring Events</h5>

• <strong>Bicycle Rentals</strong>
On Water Street, a block from the train station, next to the Peekskill Brewery.
@ <a href="https://www.facebook.com/PedalPeekskill/" target="_blank" rel="noopener noreferrer">Pedal Peekskill</a>

${farmersMarket}

• <strong>Hudson River Cruises</strong>
From the Dock at Peekskill Riverfront Green
<a href="http://peekskill.rocks/wp-content/uploads/2015/07/trinity_1.png"><img class="alignleft size-full wp-image-1480" src="http://peekskill.rocks/wp-content/uploads/2015/07/trinity_1.png" alt="trinity_1" width="887" height="183" /></a>
@ <a href="http://www.trinitycruises.com/">Trinity Cruises</a>

• <strong>Free Weekend Shuttle</strong>
From the Peekskill Train Station to the Downtown Gazebo
sponsored by <a href="http://gopeekskill.com/" target="_blank" rel="noopener noreferrer">GoPeekskill</a>
Fridays - 5:00 pm to Midnight
Saturdays - 10:00 am to Midnight
Sundays - 10:00 am to 9:00 pm

<hr />

• <strong>Don't see your event listed here?</strong> Don't worry. Send a note to <a href="mailto://events@peekskill.rocks">events@peekskill.rocks</a> and we'll be sure to add it.
• Please send by 5pm on Wednesdays, to make sure it gets into the first edition of our weekly round-up.
• Or you can post on <a href="https://www.facebook.com/PeekskillRocks/" target="_blank" rel="noopener noreferrer">our Facebook page</a>.
Future events will be added to <a href="http://peekskill.rocks/calendar/" target="_blank" rel="noopener noreferrer">our peekskill.rocks calendar</a>.
`;

function testForKaraoke({dayName, events}) {
  if (dayName !== 'Thursday') return false;

  let foundFuzzyMatch = false;

  events.forEach((e) => {
    if ((e.artist.search('Machete') != -1) || (e.venue.search('Gleason') != -1)) {
      foundFuzzyMatch = true;
    }
  });

  if (!foundFuzzyMatch) {
    tmpl += macheteKaraoke;
  }
}

function tmplDays(day) {
  tmpl += `
<h4>${day.dayName}, ${day.month} ${day.dayNum}`;

  day.holidays.forEach((h) => {
    tmpl += `
<br>${h}`;
  });

  tmpl += `
</h4>
  `;
}

function tmplEvents(day) {
  testForKaraoke(day);

  day.events.forEach((e) => {
    tmpl += `
• <strong>${e.artist}</strong>
@ <a href="${e.url}" target="_blank">${e.venue}</a> - ${e.time}
    `;
  });
}

module.exports = (data) => {
  data.forEach((day) => {
    tmplDays(day);
    tmplEvents(day);
  });

  return tmpl += footer;
};

