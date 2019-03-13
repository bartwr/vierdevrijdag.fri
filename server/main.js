import { Meteor } from 'meteor/meteor';
import './api.js';

// Import server methods
require('/imports/server/methods/events.js')

// Publish data we need
require('/imports/server/publish.js')()

Meteor.startup(() => {
  
});
