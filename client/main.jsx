import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
// import { render } from 'react-dom';

import App from '../imports/views/App/App.jsx'
import Slides from '../imports/views/Slides/Slides.jsx';
import UpcomingSessions from '../imports/views/UpcomingSessions/UpcomingSessions.jsx';

Router.route('/', function () {
  mount(App, {
    //main: <ListPageContainer/>,
  });
  // ReactLayout.render(UpCommingSessions);
  // ReactLayout.render(UpCommingSessions, {content: <Home />});
});
