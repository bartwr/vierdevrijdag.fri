import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import * as R from 'ramda';

import './NewEvent.css';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
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

    Meteor.call('events.new', this.state, this.handleEventAdded.bind(this))
  }

  handleEventAdded(err, eventId) {
    if(err) {
      console.error(err);
      return;
    }
    else {
      console.info('Event succesfully added!');
      document.location = '/events/'+eventId
    }
  }

  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit.bind(this)} className="NewEvent">
        <label>
          Title of event
          <input type="text" name="title" placeholder="Title of event" value={this.state.title} onChange={this.handleInputChange} />
        </label>
        <label>
          Meetup URL
          <input type="text" name="url" placeholder="Meetup URL" value={this.state.url} onChange={this.handleInputChange}  />
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

export default NewEvent;
