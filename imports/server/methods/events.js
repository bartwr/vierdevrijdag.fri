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
      location: obj.location,
      datetime_start: datetime_start,
      datetime_end: datetime_end
    });
  },
  'events.edit': function (obj) {

    if(! obj._id) {
      throw 'No ID given';
    }

    let datetime_start = obj.date_start + ' ' + obj.time_start;
    let datetime_end = obj.date_end + ' ' + obj.time_end;

    Events.update(obj._id, {
      name: obj.name,
      content: obj.content,
      title: obj.title,
      url: obj.url,
      location: obj.location,
      datetime_start: datetime_start,
      datetime_end: datetime_end
    });

    return obj._id;
  }
})
