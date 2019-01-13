import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

class UpcomingSessions extends Component {
  render() {
    return (
      <div>
        {R.map((event) => (<div key={event.title}>{event.title}</div>), this.props.events)}
      </div>
    );
  }
}

export default UpcomingSessionsContainer = withTracker(() => {
  return {
    events: [
      {title: 'AI Lab coworking day'},
      {title: 'Blockbar'},
      {title: 'Bitcoin Café 070'}
    ]
  };
})(UpcomingSessions);
