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
    let list = [], skipNumberOfSessionBlocks = 0;
    for (var i = this.startTime; i <= this.endTime; i = i + 0.25) {
      let session = this.getSessionForSpaceAndTime(this.props.name, i)
      if(session[0]) {
        session = session[0]
        skipNumberOfSessionBlocks = session.lengthInMinutes / 15 - 1;
        list.push(
          <div key={'session-'+i} className="ScheduleForSpace-session active" data-hour={i} data-length={session.lengthInMinutes} style={{height: (session.lengthInMinutes / 15 * 7) + '%'}}>
            <span class="Session-title">{session.title}</span>
            <span class="Session-host">{session.host}</span>
          </div>
        );
      } else {
        if(skipNumberOfSessionBlocks > 0) {
          skipNumberOfSessionBlocks--;
        } else {
          list.push(
            <div key={'session-'+i} className="ScheduleForSpace-session" data-hour={i}>
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

    this.spaces = ['Event Space', 'Lab Space', 'Main Space'];

    this.sessions = [
      {
        title: "Introduction",
        description: "An introduction to Vierde vrijdag. Plus 2 minute shoutouts - Anything to show, ask or share?",
        startTime: 17.00,
        lengthInMinutes: 15,
        host: "@all",
        space: "Main Space",
      },
      {
        title: "Patenting Block Chain",
        description: "This talk is a brief summary of the one-day conference on developments in the field of block chain innovations that was organised by the European Patent Office on 4 December 2018 and a synthesis of previously given 101 lectures on intellectual property.",
        startTime: 17.25,
        lengthInMinutes: 45,
        host: "Sil Hu",
        space: "Event Space",
      },
      {
        title: "Linux in all flavours - Something for you?",
        description: "Join this session to learn about Linux, the open source operating system. In just an half hour you'll see what devices use Linux, how Linux looks like on mobile phones, and what are the advantages of running Linux on your desktop/laptop.",
        startTime: 17.25,
        lengthInMinutes: 30,
        host: "Bart Roorda",
        space: "Lab Space",
      },
      {
        title: "Practical tips for women in tech",
        description: "At Jongens van Techniek we value diversity. We aim at inspiring more women to take on the tech journey, and to do so we will provide our own experience and some practical tips.",
        startTime: 18,
        lengthInMinutes: 30,
        host: "Lucia Piseddu",
        space: "Event Space",
      },
      {
        title: "Distributed governance in blockchain & societal projects",
        description: "Blockchain & Distributed governance. Voting offchain & onchain.",
        startTime: 18,
        lengthInMinutes: 45,
        host: "Rieke Smakman",
        space: "Lab Space",
      },
      {
        title: "Drinks 🍷 & food 🍍",
        description: "",
        startTime: 19.00,
        lengthInMinutes: 45,
        host: "Lekker netwerken",
        space: "Main Space",
      },
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
