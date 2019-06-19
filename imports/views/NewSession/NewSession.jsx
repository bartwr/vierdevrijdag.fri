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
      image: '',
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

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault()

    Meteor.call('sessions.new', this.state, this.handleSessionAdded.bind(this))
  }

  handleSessionAdded(err, sessionId) {
    var self = this;
    if(err) {
      console.error(err);
      return;
    }
    else {
      console.info('Session succesfully added!');
      alert('Nice! You\'ll receive an email with additional info in the near future.')
      // Now send email.
      Meteor.call('sessions.newSessionEmail', this.state, function() {
        document.location = '/events/'+self.state.eventId;
      });
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

    let startTimes = [], timeArray;
    for(let t = parseFloat(startHour + '.' + startMinutes); t <= parseFloat(endHour + '.' + endMinutes); t += 0.25) {
      timeArray = String(t).split('.');
      startTimes.push({
        decimal: t,
        hourly: 
          timeArray[0]
          + ':'
          + (timeArray[1] && timeArray[1] > 0
              ? (timeArray[1] / 100 * 60) + (
                  (timeArray[1] / 100 * 60) == 3 ? '0' : ''
                )
              : '00'
            )
      });
    }

    return startTimes;
  }

  render() {
    this.populateStartTimes();
    return (
      <form method="post" onSubmit={this.handleSubmit.bind(this)} className="NewSession">
        <hr />
        <div style={{backgroundColor: '#eee', padding: '10px', marginBottom: '50px'}}>
        <p>
          Nice that you want to host a session! Vierde vrijdag is really about sharing knowledge and experience. No pitches, but sharing about setting up a business, your learnings, your hobby, a project you're working on, an interest of you. Everything related to business and tech.
        </p>
        <p>
          We'll help you hosting your session. You'll have a beamer and such, and we'll promote the session with you. Towards the event we'll send some emails with best practices, so you'll be fully prepared.
        </p>
        <p>
          <b><i>So, What's your session about?</i></b>
        </p>
        </div>
        <label style={{color: '#0fd9a3'}}>
          Title of your session
          <input type="text" name="title" required placeholder="Title of your session" value={this.state.title} onChange={this.handleInputChange} />
        </label>
        <label>
          Short description (+- 4 sentences max.)
          <textarea name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange}  />
        </label>
        <label>
          Start time
          <select name="startTime" onChange={this.handleInputChange}>
            <option value="">Select a start time</option>
            {R.map((time) => <option key={time.decimal} value={time.decimal}>{time.hourly}</option>, this.populateStartTimes())}
          </select>
        </label>
        <label>
          Length in minutes
          <input type="number" name="lengthInMinutes" min="15" max="120" step="15" value={this.state.lengthInMinutes} onChange={this.handleInputChange}  />
        </label>
        <label>
          Prefered space
          <select name="space" onChange={this.handleInputChange}>
            <option value="-">--Select a space--</option>
            <option value="Main Space">Main Space (introduction, drinks & dinner)</option>
            <option value="Event Space">Event Space (max 40 ppl)</option>
            <option value="Lab Space">Lab Space (max 15 ppl)</option>
            {/*<option value="Discuss Space">Discuss Space (max. 20 ppl)</option>*/}
          </select>
        </label>
        <label>
          Image URL
          <input type="text" name="image" required value={this.state.image} onChange={this.handleInputChange}  />
        </label>
        <label>
          Name of host (in example: your name)
          <input type="text" name="host" required value={this.state.host} onChange={this.handleInputChange}  />
        </label>
        <label>
          Email address of the host
          <input type="email" name="hostEmail" required value={this.state.hostEmail} onChange={this.handleInputChange}  />
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
