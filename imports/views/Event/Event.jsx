import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

// Import models
import Events from '../../api/events';

// Import components
import UpcomingSessions from '../UpcomingSessions/UpcomingSessions.jsx';
import NextMeetup from '../NextMeetup/NextMeetup.jsx';
import NewSession from '../NewSession/NewSession.jsx';
import Schedule from '/imports/components/Schedule/Schedule.jsx';

import './Event.css';

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFormVisible: false
    }
  }

  toggleNewSessionForm(e) {
    e.preventDefault()

    this.setState({
      isFormVisible: ! this.state.isFormVisible
    });
  }

  render() {
    // Get eventId
    const eventId = this.props.eventId
                    || (this.props.events[0] && this.props.events[0]._id
                        ? this.props.events[0]._id : false);
    // If no eventId is there, show 'Loading'
    if(! eventId) return <div>Loading</div>
    return (
      <div className="Event">
        <div className="Text">
          <p>
            Vierde vrijdag is a meetup for bringing people & knowledge together, happening every fourth Friday of the month.
          </p>
          <p>
            This meetup is organized by the community themselves.
            Anyone is welcome to join. Do you have something to share, related to business & tech? <a href="#new-event" onClick={this.toggleNewSessionForm.bind(this)} className="button">
              Add your session
            </a>
          </p>
          <div hidden={! this.state.isFormVisible && this.props.NewSession !== true}>
            <NewSession eventId={eventId} />
          </div>
        </div>
        <NextMeetup eventId={eventId} />
        <Schedule eventId={eventId} />
      </div>
    );
  }
}

export default EventContainer = withTracker((props) => {
  Meteor.subscribe('lastEvent');

  return {
    eventId: props.eventId,
    events: Events.find({}).fetch()
  }
})(Event);
