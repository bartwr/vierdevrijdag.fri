import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

// import './NewEvent.css';

class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props);
    return (
      <div>
        Event View
      </div>
    );
  }
}

export default Event;
