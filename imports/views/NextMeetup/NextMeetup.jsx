import React, { Component } from 'react';

import './NextMeetup.css';

class NextMeetup extends Component {
  render() {
    return (
      <a href="https://www.meetup.com/vierdevrijdag/events/jjtxlqyzgbjc/" target="_blank" className="NextMeetup">
        <div className="text--label">Your Next Meetup</div>
        <h2 className="heroPrimary">Vierde vrijdag</h2>
        <div className="meta">
          The Hague Tech |
          Fri April 26th at 4:30 PM
        </div>
      </a>
    );
  }
}

export default NextMeetup;
