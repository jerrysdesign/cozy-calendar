// Generated by CoffeeScript 1.9.0
var Contact, Event, Tag, User, WebDavAccount, async, cozydb;

async = require('async');

Tag = require('../models/tag');

Event = require('../models/event');

Contact = require('../models/contact');

User = require('../models/user');

cozydb = require('cozydb');

WebDavAccount = require('../models/webdavaccount');

module.exports.index = function(req, res) {
  return async.parallel([
    function(done) {
      return Contact.all(function(err, contacts) {
        var contact, index, _i, _len;
        if (err) {
          return done(err);
        }
        for (index = _i = 0, _len = contacts.length; _i < _len; index = ++_i) {
          contact = contacts[index];
          contacts[index] = contact.asNameAndEmails();
        }
        return done(null, contacts);
      });
    }, function(cb) {
      return Tag.all(cb);
    }, function(cb) {
      return Event.all(cb);
    }, function(cb) {
      return cozydb.api.getCozyInstance(cb);
    }, function(cb) {
      return WebDavAccount.first(cb);
    }
  ], function(err, results) {
    var contacts, events, instance, locale, tags, webDavAccount;
    if (err) {
      return res.send({
        error: 'Server error occurred while retrieving data',
        stack: err.stack
      });
    } else {
      contacts = results[0], tags = results[1], events = results[2], instance = results[3], webDavAccount = results[4];
      locale = (instance != null ? instance.locale : void 0) || 'en';
      if (webDavAccount != null) {
        webDavAccount.domain = (instance != null ? instance.domain : void 0) || '';
      }
      return res.render('index.jade', {
        imports: "window.locale = \"" + locale + "\";\nwindow.inittags = " + (JSON.stringify(tags)) + ";\nwindow.initevents = " + (JSON.stringify(events)) + ";\nwindow.initcontacts = " + (JSON.stringify(contacts)) + ";\nwindow.webDavAccount = " + (JSON.stringify(webDavAccount)) + ";"
      });
    }
  });
};

module.exports.userTimezone = function(req, res) {
  if (req.query.keys !== "timezone") {
    return res.send(403, "keys not exposed");
  } else {
    return res.send(User.timezone);
  }
};
