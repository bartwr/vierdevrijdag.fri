import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UpcomingSessions from '../UpcomingSessions/UpcomingSessions.jsx';
import NextMeetup from '../NextMeetup/NextMeetup.jsx';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    if (location.href.indexOf('localhost') <= -1 && location.protocol !== 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      return false;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Text">
          <p>
            Vierde vrijdag is a meetup for bringing people & knowledge together, happening every fourth Friday of the month.
          </p>
          <p>
            This meetup is organized by the community themselves. Anyone is welcome to join. Do you have something to share, related to business & tech? <a href="https://docs.google.com/forms/d/e/1FAIpQLSfOMPfYigJbng2kiBVJn5eEBb4WN2WgcIIxUVP3SBXStrWwIw/viewform" target="_blank" className="button">Add your session</a>
          </p>
        </div>
        <NextMeetup />
        {this.props.content}
        <p align="center">
          <small>This site is <a href="https://github.com/bartwr/vierdevrijdag.fri" target="_blank">open source</a> - feel free to contribute.</small><br /><br />
        </p>
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {
  return {}
})(App);
