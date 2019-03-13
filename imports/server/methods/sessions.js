import Sessions from '/imports/api/sessions';

Meteor.methods({
  'sessions.new': function (obj) {
    return Sessions.insert({
      eventId: obj.eventId,
      title: obj.title,
      description: obj.description,
      startTime: obj.startTime,
      lengthInMinutes: obj.lengthInMinutes,
      space: obj.space,
      host: obj.host,
      hostEmail: obj.hostEmail
    });
  }
})
