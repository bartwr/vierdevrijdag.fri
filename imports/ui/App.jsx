import React from 'react';
import Slides from '../views/Slides/Slides.jsx';
import UpcomingSessions from '../views/UpcomingSessions/UpcomingSessions.jsx';

const App = () => (
  <div>
    <h1>
      Upcoming tech meetups in The Hague
    </h1>
    {/*<Slides />*/}
    <UpcomingSessions />
  </div>
);

export default App;
