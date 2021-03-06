import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

import App from '../imports/views/App/App.jsx'
import UpcomingSessions from '../imports/views/UpcomingSessions/UpcomingSessions.jsx';
import Dinner from '../imports/views/Dinner/Dinner.jsx';
import NewEvent from '../imports/views/NewEvent/NewEvent.jsx';
import Event from '../imports/views/Event/Event.jsx';
import Webhook from '../imports/views/Webhook/Webhook.jsx';

Router.route('/', function () {
  mount(App, {
    content: <Event />
  });
});

Router.route('/sessions/new', function () {
  mount(App, {
    content: <Event NewSession={true} />
  });
});

Router.route('/dinner', function () {
  mount(App, {
    content: <Dinner />
  });
});

Router.route('/webhook', function () {
  mount(App, {
    content: <Webhook />
  });
});

Router.route('/events/new', function () {
  mount(App, {
    content: <NewEvent />
  });
});

Router.route('/events/edit/:eventId', function () {
  mount(App, {
    content: <NewEvent eventId={this.params.eventId} />
  });
});

Router.route('/events/:eventId', function () {
  mount(App, {
    content: <Event eventId={this.params.eventId} />
  });
});

Meteor.startup(() => {   
  if(navigator.serviceWorker != undefined)    
    navigator.serviceWorker.register('/sw.js') .then() .catch(error => console.log('ServiceWorker registration failed: ', err));    
});

/**
 * Push notifications
 */
var OneSignal = window.OneSignal || [];
OneSignal.push(["init", {
  appId: "450ebaff-1048-4e30-8382-9b3ec39022c6",
  autoRegister: false,
  notifyButton: {
    enable: false /* Set to false to hide */
  },
  promptOptions: {
    /* Change bold title, limited to 30 characters */
    siteName: 'Vierde vrijdag!',
    /* Change click allow text, limited to 30 characters */
    autoAcceptTitle: 'Click Allow',
    /* Subtitle, limited to 90 characters */
    actionMessage: "We'd like to show you notifications :)",
    /* Accept button text, limited to 15 characters */
    acceptButtonText: "OK!",
    /* Cancel button text, limited to 15 characters */
    cancelButtonText: "No thanks",
  }
  // welcomeNotification: {
  //   "title": "Gefeliciteerd!",
  //   "message": "Je wordt nu op de hoogte gehouden van updates.",
  //   // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
  // }
}]);

function subscribe() {
  OneSignal.push(["registerForPushNotifications"]);
}

function unsubscribe() {
  OneSignal.setSubscription(false);
  alert('Je bent nu afgemeld voor webnotificaties.');
  document.getElementById("onesignal-unsubscribe-link").style.display = 'none';
}

var OneSignal = OneSignal || [];
/* This example assumes you've already initialized OneSignal */
OneSignal.push(function() {
    // If we're on an unsupported browser, do nothing
    if ( ! OneSignal.isPushNotificationsSupported()) {
      return;
    }
    OneSignal.isPushNotificationsEnabled(function(isEnabled) {
      if (isEnabled) {
          // The user is subscribed to notifications
          document.getElementById("onesignal-unsubscribe-link").addEventListener('click', unsubscribe);
          document.getElementById("onesignal-unsubscribe-link").style.display = '';
      } else {
          document.getElementById("onesignal-subscribe-link").addEventListener('click', subscribe);
          document.getElementById("onesignal-subscribe-link").style.display = '';
      }
    });
});

subscribe()
