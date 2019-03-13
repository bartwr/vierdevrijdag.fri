import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import Schedule from '/imports/components/Schedule/Schedule.jsx';

import './UpcomingSessions.css';

class UpcomingSessions extends Component {
  render() {
    return (
      <div className="UpcomingSessions">
        <Schedule />
      </div>
    );
  }
}

export default UpcomingSessions;
