// Generated by CoffeeScript 1.7.1
var contacts, events, ical, index;

events = require('./events');

contacts = require('./contacts');

index = require('./index');

ical = require('./ical');

module.exports = {
  '': {
    get: index.index
  },
  'tags': {
    get: index.tags
  },
  'users/current': {
    get: index.userTimezone
  },
  'events': {
    get: events.all,
    post: events.create
  },
  'eventid': {
    param: events.fetch
  },
  'events/:eventid': {
    get: events.read,
    put: events.update,
    del: events["delete"]
  },
  'events/:eventid/:name.ics': {
    get: events.ical
  },
  'public/events/:eventid/:name.ics': {
    get: events.publicIcal
  },
  'public/events/:eventid': {
    get: events["public"]
  },
  'export/calendar.ics': {
    get: ical["export"]
  },
  'import/ical': {
    post: ical["import"]
  },
  'contacts': {
    get: contacts.list
  }
};
