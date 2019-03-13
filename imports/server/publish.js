Events = require('/imports/api/events.js')

module.exports = function() {
  Meteor.publish('events', function(){
    return Events.find()
  })
}
