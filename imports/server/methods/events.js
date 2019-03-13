import Events from '/imports/api/events';

Meteor.methods({
  'events.new': function (obj) {

    let datetime_start = obj.date_start + ' ' + obj.time_start;
    let datetime_end = obj.date_end + ' ' + obj.time_end;

    return Events.insert({
      name: obj.name,
      content: obj.content,
      title: obj.title,
      url: obj.url,
      datetime_start: datetime_start,
      datetime_end: obj.datetime_end
    });
  }
})
