import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Slides from '../Slides/Slides.jsx';
import UpcomingSessions from '../UpcomingSessions/UpcomingSessions.jsx';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      	{/*<Slides />*/}
        <div className="Text">
          <p>
            Vierde vrijdag is a meetup for bringing people & knowledge together, happening every fourth Friday of the month.
          </p>
          <p>
            This meetup is organized by the community themselves. Anyone is welcome to join. Do you have something to share, related to business & tech? <a href="https://docs.google.com/forms/d/e/1FAIpQLSfOMPfYigJbng2kiBVJn5eEBb4WN2WgcIIxUVP3SBXStrWwIw/viewform" target="_blank" className="button">Add your session</a>
          </p>
        </div>
      	<UpcomingSessions />
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {
  return {}
})(App);
