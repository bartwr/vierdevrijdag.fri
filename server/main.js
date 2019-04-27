import { Meteor } from 'meteor/meteor';
import './api.js';
import './mollie.js';

// Import server methods
require('/imports/server/methods/events.js')
require('/imports/server/methods/sessions.js')

// Publish data we need
require('/imports/server/publish.js')()

Meteor.startup(() => {
});
