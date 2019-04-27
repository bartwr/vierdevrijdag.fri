import Events from '/imports/api/events.js'
import Sessions from '/imports/api/sessions.js'

module.exports = function() {
  Meteor.publish('events', function(){
    return Events.find()
  })
  Meteor.publish('lastEvent', function(){
    return Events.find({}, { sort: {datetime_start: -1}, limit: 1 })
  })
  Meteor.publish('event', function(eventId){
    return Events.find({ _id: eventId })
  })
  Meteor.publish('sessions', function(eventId){
    return Sessions.find({ eventId: eventId })
  })
  Meteor.publish('session', function(sessionId){
    return Sessions.find({ _id: sessionId })
  })
}
