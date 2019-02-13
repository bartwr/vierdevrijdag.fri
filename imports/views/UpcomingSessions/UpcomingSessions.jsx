import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import Schedule from '/imports/components/Schedule/Schedule.jsx';

import './UpcomingSessions.css';

class UpcomingSessions extends Component {
  render() {
    return (
      <div className="UpcomingSessions">
        <div className="UpcomingSessions-next-meetup">
          <div className="text--label">Your Next Meetup</div>
          <a href="https://www.meetup.com/vierdevrijdag/events/jjtxlqyzdbdc/" target="_blank">
            <h2 className="heroPrimary">Vierde vrijdag</h2>
          </a>
          <div className="meta">
            The Hague Tech |
            Fri Feb 22 at 5 PM
          </div>
        </div>
        <Schedule />
      </div>
    );
  }
}

export default UpcomingSessions;
