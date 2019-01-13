import { Meteor } from 'meteor/meteor';

// const { getCache, writeCache } = require("./cache-service.js");
// const CryptoJS = require('crypto-js')

// const limit = 99999;
// const city = 'The Hague';

// // Import the Meetup API library, for easily using the Meetup API 
// var meetup = require('meetup-api')({
//   key: '74492f3a52513c481b7850148286f37'
// });

if(Meteor.isServer) {
  // https://www.codementor.io/codeforgeek/rest-crud-operation-using-meteor-du10808m5
  Router.route('/users', function() {
    var response;
    response = {
      "error" : true,
      "message" : "invalid data"
    };
    this.response.setHeader('Content-Type','application/json');
    this.response.end(JSON.stringify(response));
  }, {where: 'server'});
}
