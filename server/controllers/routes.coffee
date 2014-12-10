events = require './events'
contacts = require './contacts'
index  = require './index'
ical   = require './ical'

module.exports =

    '' : get : index.index
    'tags': get : index.tags
    'users/current': get : index.userTimezone

    # Event management
    'events':
        get   : events.all
        post  : events.create
    'eventid':
        param : events.fetch

    'events/rename-calendar':
        post: events.bulkCalendarRename
    'events/delete':
        del: events.bulkDelete

    'events/:eventid':
        get   : events.read
        put   : events.update
        del   : events.delete

    'events/:eventid/:name.ics':
        get   : events.ical
    'public/events/:eventid/:name.ics':
        get   : events.publicIcal
    'public/events/:eventid':
        get   : events.public

    # ICal
    'export/:calendarid.ics':
        get   : ical.export
    'import/ical':
        post  : ical.import
    #'public/calendars/:calendarname.ics':
        #get   : ical.calendar

    # Contacts
    'contacts':
        get: contacts.list
