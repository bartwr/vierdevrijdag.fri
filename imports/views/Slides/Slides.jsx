import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Slides extends Component {
  render() {
    return (
      <div>
        <p>
          Slides with vierdevrijdag, blockbar, ai lab, the hague tech
        </p>
        <h2>#vierdevrijdag</h2>
        <ul>
          <li>Every fourth Friday of the month</li>
          <li>Meetup for sharing knowledge & experience</li>
          <li>At the tech hub The Hague Tech</li>
          <li>meetup.com/vierdevrijdag</li>
        </ul>
        <h2>The Hague Tech</h2>
        <ul>
          <li>Tech community in The Hague</li>
          <li>Offers 'community membership' & workspaces</li>
          <li>thehaguetech.com/events</li>
        </ul>
        <h2>Blockbar</h2>
        <ul>
          <li>Community interested in blockchain & cryptocurrencies</li>
          <li>coworking days</li>
          <li>talks</li>
          <li>workshops</li>
          <li>courses</li>
          <li>blockbar.nl</li>
        </ul>
        <h2>AI Lab</h2>
        <ul>
          <li>Community interested in AI & machine learning</li>
          <li>coworking days</li>
          <li>talks</li>
          <li>workshops</li>
          <li>courses</li>
          <li>meetup.com/AI-Lab</li>
        </ul>
      </div>
    );
  }

  makeSlide(slide) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

export default SlidesContainer = withTracker(() => {
  return {
  };
})(Slides);
