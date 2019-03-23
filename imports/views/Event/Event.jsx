import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

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
            <NewSession eventId={this.props.eventId || '5c9668335e9c51e658c38712'} />
          </div>
        </div>
        <NextMeetup />
        <Schedule eventId={this.props.eventId || '5c9668335e9c51e658c38712'} />
      </div>
    );
  }
}

export default Event;
