import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import './Schedule.css';

class ScheduleHours extends React.Component {
  constructor(props) {
    super(props);

    this.startTime = 17;
    this.endTime   = 20;
  }

  render() {
    let list = [];
    for (var i = this.startTime; i <= this.endTime; i = i + 0.25) {
      list.push(
        <div key={'hour-'+i} className="ScheduleHours-hour" data-hour={i}>
          {i % 1 === 0 ? i : ''}
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

    this.startTime = 17;
    this.endTime   = 20;
  }

  getSessionForSpaceAndTime(space, time) {
    return R.filter((session) => {
      return session.space == space && session.startTime == time
    }, this.props.sessions);
  }

  render() {
    let list = [];
    for (var i = this.startTime; i <= this.endTime; i = i + 0.25) {
      let session = this.getSessionForSpaceAndTime(this.props.name, i)
      if(session[0]) {
        session = session[0]
        list.push(
          <div key={'session-'+i} className="ScheduleForSpace-session active" data-hour={i} data-length={session.lengthInMinutes} style={{height: (session.lengthInMinutes / 15 * 7) + '%'}}>
            <span class="Session-title">{session.title}</span>
            <span class="Session-host">{session.host}</span>
          </div>
        );
      } else {
        list.push(
          <div key={'session-'+i} className="ScheduleForSpace-session" data-hour={i}>
          </div>
        )
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

    this.spaces = ['Event Space', 'Lab Space', 'Main Space'];

    this.sessions = [
      {
        title: "Introduction",
        description: "An introduction to Vierde vrijdag. Plus 2 minute shoutouts - Anything to show, ask or share?",
        startTime: 17.00,
        lengthInMinutes: 15,
        host: "Vierde vrijdag community",
        space: "Main Space",
      },
      {
        title: "Practical tips for women in tech",
        description: "At Jongens van Techniek we value diversity. We aim at inspiring more women to take on the tech journey, and to do so we will provide our own experience and some practical tips.",
        startTime: 17.25,
        lengthInMinutes: 30,
        host: "Lucia Piseddu",
        space: "Event Space",
      },
      {
        title: "Distributed governance in blockchain & societal projects",
        description: "Blockchain & Distributed governance. Voting offchain & onchain.",
        startTime: 18.00,
        lengthInMinutes: 45,
        host: "Rieke Smakman",
        space: "Lab Space",
      }
    ]

    this.startTime = 17;
    this.endTime   = 20;
  }

  render() {
    return (
      <div className="Day">
        <ScheduleHours />
        {R.map((name) =>
          <ScheduleForSpace key={name} name={name} sessions={this.sessions} />
        , this.spaces)}
      </div>
    );
  }
}
class Schedule extends React.Component {
  render() {
    return (
      <div className="Schedule">
        <Day />
      </div>
    );
  }
}

export default ScheduleContainer = withTracker(() => {
  return {}
})(Schedule);
