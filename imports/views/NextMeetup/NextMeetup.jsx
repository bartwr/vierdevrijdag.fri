import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './NextMeetup.css';

class NextMeetup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(! this.props.event) return <div />
    return (
      <a href={this.props.event.url} target="_blank" className="NextMeetup">
        <div className="text--label">
          Your Meetup
        </div>
        <h2 className="heroPrimary">
          {this.props.event && this.props.event.title}
        </h2>
        <div className="meta">
          {this.props.event && this.props.event.location} | {
            this.props.event && this.props.event.datetime_start
          }
        </div>
      </a>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('event', props.eventId);

  return {
    event: Events.findOne(props.eventId)
  }
})(NextMeetup);
