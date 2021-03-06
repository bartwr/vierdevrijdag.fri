import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import Events from '../../api/events';
import Sessions from '../../api/sessions';

// Import components
import SessionDetails from '../SessionDetails/SessionDetails.jsx';

import './Schedule.css';

class ScheduleHours extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let list = [];
    for (var i = this.props.startTime; i <= this.props.endTime; i = i + 0.25) {
      list.push(
        <div key={'hour-'+i} className={'ScheduleHours-hour' + (i % 1 == 0 ? ' is-full-hour' : '')} data-hour={i}>
          <div className="time">
            {i % 1 === 0 ? i + ':00' : ''}
          </div>
        </div>
      );
    }
    return (
      <section className="ScheduleHours">
        <header className="ScheduleHeader">
          #
        </header>
        <div className="ScheduleHours-timeslots">
          {list}
        </div>
      </section>
    )
  }
}

class ScheduleForSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  getSessionForSpaceAndTime(space, time) {
    return R.filter((session) => {
      return session.space == space && session.startTime == time
    }, this.props.sessions);
  }

  render() {
    let list = [], skipNumberOfSessionBlocks = 0;
    for (var i = this.props.startTime; i <= this.props.endTime; i = i + 0.25) {
      let session = this.getSessionForSpaceAndTime(this.props.name, i)
      if(session[0]) {
        session = session[0]
        skipNumberOfSessionBlocks = session.lengthInMinutes / 15 - 1;
        list.push(
          <div
            key={'session-'+i}
            className="ScheduleForSpace-session active"
            data-hour={i}
            data-length={session.lengthInMinutes}
            style={{
              minHeight: (session.lengthInMinutes / 15 * 20) + 'px',
              height: (session.lengthInMinutes / 15 * 20) + 'px'
            }}
            onClick={() => this.props.showSessionDetails(session)}
            >
            <div className="Session-background-image" style={{backgroundImage: `url(${session.image})`}}></div>
            <span className="Session-title">{session.title}</span>
            <span className="Session-host">{session.host}</span>
          </div>
        );
      } else {
        if(skipNumberOfSessionBlocks > 0) {
          skipNumberOfSessionBlocks--;
        } else {
          list.push(
            <div key={'session-'+i} className={'ScheduleForSpace-session' + (i % 1 == 0 ? ' is-full-hour' : '')} data-hour={i}>
            </div>
          )
        }
      }
    }

    return (
      <section className="ScheduleForSpace">
        <header className="ScheduleHeader">
          {this.props.name}
        </header>
        <div className="ScheduleHours-timeslots">
          {list}
        </div>
      </section>
    )
  }
}

class Day extends React.Component {
  constructor(props) {
    super(props);

    // this.spaces = ['Main Space', 'Event Space', 'Lab Space'];
    this.spaces = ['Main Space', 'Event Space'];
  }

  render() {
    if(! this.props || ! this.props.event) return (<div>loading event day..</div>);

    // Extract time from datetime objects
    const startTime = this.props.event.datetime_start.substr(this.props.event.datetime_start.length - 5);
    const endTime = this.props.event.datetime_end.substr(this.props.event.datetime_end.length - 5);

    // Get only the hour
    const startHour = startTime.substr(0, 2);
    const endHour = endTime.substr(0, 2);

    // Get the minutes as a decimal number (15 minutes = 0.25)
    const startMinutes = startTime.substr(3, 2) / 60 * 100;
    const endMinutes = endTime.substr(3, 2) / 60 * 100;

    const startTimeFormatted = parseFloat(startHour + '.' + startMinutes);
    const endTimeFormatted = parseFloat(endHour + '.' + endMinutes);

    return (
      <div className="Day">
        <ScheduleHours startTime={startTimeFormatted} endTime={endTimeFormatted} event={this.props.event} sessions={this.props.sessions} />
        {R.map((name) =>
          <ScheduleForSpace
            key={name}
            name={name}
            startTime={startTimeFormatted}
            endTime={endTimeFormatted}
            sessions={this.props.sessions}
            showSessionDetails={this.props.showSessionDetails}
            />
        , this.spaces)}
      </div>
    );
  }
}
class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSessionDetails: false,
      activeSession: {}
    }
  }

  showSessionDetails(session) {
    this.setState({
      showSessionDetails: true,
      activeSession: session
    })
  }

  render() {
    if(! this.props.sessions) {
      return (
        <div>loading event..</div>
      )
    }
    return (
      <div className="Schedule">
        <Day
          event={this.props.event}
          sessions={this.props.sessions}
          showSessionDetails={this.showSessionDetails.bind(this)}
          />
        {this.state.showSessionDetails
          && <SessionDetails
              session={this.state.activeSession}
              close={() => this.setState({ showSessionDetails: false })}
              />}
      </div>
    );
  }
}

export default ScheduleContainer = withTracker((props) => {
  Meteor.subscribe('event', props.eventId)
  Meteor.subscribe('sessions', props.eventId)

  return {
    event: Events.findOne(props.eventId),
    sessions: Sessions.find({ eventId: props.eventId }).fetch()
  }
})(Schedule);
