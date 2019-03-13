import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import Events from '/imports/api/events.js';

import './NewSession.css';

class NewSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      startTime: '',
      lengthInMinutes: '',
      host: '',
      hostEmail: '',
      space: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.state.eventId = this.props.eventId;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log('target', target)
    console.log('value', value)
    console.log('name', name)

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault()

    Meteor.call('sessions.new', this.state, this.handleSessionAdded.bind(this))
  }

  handleSessionAdded(err, sessionId) {
    if(err) {
      console.error(err);
      return;
    }
    else {
      console.info('Session succesfully added!');
      document.location = '/events/'+this.state.eventId
    }
  }

  populateStartTimes() {
    // Do nothing if event is unknown
    if(! this.props.event) return [];

    // Extract time from datetime objects
    const startTime = this.props.event.datetime_start.substr(this.props.event.datetime_start.length - 5);
    const endTime = this.props.event.datetime_end.substr(this.props.event.datetime_end.length - 5);

    // Get only the hour
    const startHour = startTime.substr(0, 2);
    const endHour = endTime.substr(0, 2);

    // Get the minutes as a decimal number (15 minutes = 0.25)
    const startMinutes = startTime.substr(3, 2) / 60 * 100;
    const endMinutes = endTime.substr(3, 2) / 60 * 100;

    let startTimes = []
    for(let t = parseFloat(startHour + '.' + startMinutes); t <= parseFloat(endHour + '.' + endMinutes); t += 0.25) {
      startTimes.push(t);
    }

    return startTimes;
  }

  render() {
    this.populateStartTimes();
    return (
      <form method="post" onSubmit={this.handleSubmit.bind(this)} className="NewSession">
        <label>
          Title of your session
          <input type="text" name="title" placeholder="Title of your session" value={this.state.title} onChange={this.handleInputChange} />
        </label>
        <label>
          Short description (+- 4 sentences max.)
          <textarea name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange}  />
        </label>
        <label>
          Start time
          <select name="startTime" onChange={this.handleInputChange}>
            {R.map((time) => <option key={time} value={time}>{time}</option>, this.populateStartTimes())}
          </select>
        </label>
        <label>
          Length in minutes
          <input type="number" name="lengthInMinutes" min="15" max="120" step="15" value={this.state.lengthInMinutes} onChange={this.handleInputChange}  />
        </label>
        <label>
          Prefered space
          <select name="space" onChange={this.handleInputChange}>
            <option value="Event Space">Event Space</option>
            <option value="Lab Space">Lab Space</option>
            <option value="Main Space">Main Space</option>
          </select>
        </label>
        <label>
          Name of host (in example: your name)
          <input type="text" name="host" value={this.state.host} onChange={this.handleInputChange}  />
        </label>
        <label>
          Email address of the host
          <input type="email" name="hostEmail" value={this.state.hostEmail} onChange={this.handleInputChange}  />
        </label>
        <label>
          <button type="submit">Save</button>
        </label>
      </form>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('event', props.eventId);

  return {
    event: Events.findOne(props.eventId)
  }
})(NewSession);
