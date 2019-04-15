import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import './NewEvent.css';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.eventId,
      title: '',
      url: '',
      location: '',
      date_start: '',
      time_start: '',
      date_end: '',
      time_end: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
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

    // Edit
    if(this.state._id) {
      Meteor.call('events.edit', this.state, this.handleEventAdded.bind(this))
    // Or Add
    } else {
      Meteor.call('events.new', this.state, this.handleEventAdded.bind(this))
    }
  }

  handleEventAdded(err, eventId) {
    if(err) {
      console.error(err);
      return;
    }
    else {
      // Event succesfully added/modified!';
      alert('Saved!');
      document.location = '/events/'+eventId
    }
  }

  componentWillReceiveProps(props) {

    // Convert datetime
    let startDate, startTime, endDate, endTime;
    if(props.event.datetime_start) {
      startDate = props.event.datetime_start.substr(0, 10);
      startTime = props.event.datetime_start.substr(props.event.datetime_start.length - 5);
    }
    if(props.event.datetime_end) {
      endDate = props.event.datetime_end.substr(0, 10);
      endTime = props.event.datetime_end.substr(props.event.datetime_end.length - 5);
    }

    // Set state
    this.setState({
      _id: props.event._id,
      title: props.event.title,
      url: props.event.url,
      location: props.event.location,
      date_start: startDate,
      time_start: startTime,
      date_end: endDate,
      time_end: endTime
    })
  }

  render() {
    // Extract time from datetime objects
    return (
      <form method="post" onSubmit={this.handleSubmit.bind(this)} className="NewEvent">
        <label>
          Title of event
          <input type="text" name="title" required placeholder="Title of event" value={this.state.title} onChange={this.handleInputChange} />
        </label>
        <label>
          Meetup URL
          <input type="text" name="url" placeholder="Meetup URL" value={this.state.url} onChange={this.handleInputChange}  />
        </label>
        <label>
          Location
          <input type="text" name="location" placeholder="Meetup location" value={this.state.location} onChange={this.handleInputChange}  />
        </label>
        <label>
          Start date & time
          <input type="date" name="date_start" placeholder="Start date" value={this.state.date_start} onChange={this.handleInputChange}  />
          <input type="time" name="time_start" placeholder="Start time" value={this.state.time_start} onChange={this.handleInputChange}  />
        </label>
        <label>
          End date & time
          <input type="date" name="date_end" placeholder="End date" value={this.state.date_end} onChange={this.handleInputChange}  />
          <input type="time" name="time_end" placeholder="End time" value={this.state.time_end} onChange={this.handleInputChange}  />
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
})(NewEvent);
