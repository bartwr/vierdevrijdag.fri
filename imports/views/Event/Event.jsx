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

  goToPreviousEvent(datetime_start) {
    const previousEvent = Events.find(
      { datetime_start: { $lt: datetime_start }}
      , { sort: {datetime_start: -1}, limit: 1 }
    ).fetch()

    if(previousEvent[0]) {
      Router.go('/events/' + previousEvent[0]._id);
    } else {
      alert('Amazing. You\'ve just witnessed the first event ever on this site. You can\'t go further back into history. Try to go forward.')
    }
  }

  goToNextEvent(datetime_start) {
    const nextEvent = Events.find(
      { datetime_start: { $gt: datetime_start }}
      , { sort: {datetime_start: 1}, limit: 1 }
    ).fetch()

    if(nextEvent[0]) {
      Router.go('/events/' + nextEvent[0]._id);
    } else {
      prompt('You\'ve reached the latest event. Want to create the next event yourself? Go to vierdevrijdag.info/events/new', 'https://www.vierdevrijdag.info/events/new');
    }
  }

  render() {
    // Get eventId
    const eventId = this.props.eventId
                    || (this.props.currentEvent[0] && this.props.currentEvent[0]._id
                        ? this.props.currentEvent[0]._id : false);
    const datetime_start = (this.props.currentEvent[0] ? this.props.currentEvent[0].datetime_start : null);
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
        <div className="Event-eventNavigation">
          <a onClick={this.goToPreviousEvent.bind(this, datetime_start)} className="Event-eventNavigation-button previous">
            &lt;
          </a>
          <a onClick={this.goToNextEvent.bind(this, datetime_start)} className="Event-eventNavigation-button next">
            &gt;
          </a>
        </div>
      </div>
    );
  }
}

export default EventContainer = withTracker((props) => {

  // Get current event
  if(props.eventId) {
    Meteor.subscribe('event', props.eventId);
  } else {
    Meteor.subscribe('latestEvent');
  }
  const currentEvent = Events.find({}).fetch();

  // Get next & previous event
  if(currentEvent.length > 0) {
    const datetime_start = currentEvent[0].datetime_start;
    Meteor.subscribe('previousEvent', datetime_start);
    Meteor.subscribe('nextEvent', datetime_start);
  }

  return {
    eventId: props.eventId,
    currentEvent: currentEvent
  }
})(Event);
