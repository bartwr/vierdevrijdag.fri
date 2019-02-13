import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './Slides.css';

class Slide extends Component {
  render() {
    return (
      <div className="Slide" style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

class Slides extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0
    }
  }

  componentDidMount() {
    const self = this;
    setInterval(function() {
      let newSlide = self.state.currentSlide + 1;
      self.setState({
        currentSlide: newSlide <= 3 ? newSlide : 0
      })
    }, 5000)
  }

  render() {
    return (
      <div className="Slides">
        <Slide style={Object.assign({}, this.state.currentSlide != 0 && {display: 'none'})}>
          <h2>#vierdevrijdag</h2>
          <ul>
            <li>Every fourth Friday of the month</li>
            <li>Meetup for sharing knowledge & experience</li>
            <li>At the tech hub The Hague Tech</li>
          </ul>
          <h5>
            <a href="https://www.meetup.com/vierdevrijdag/" target="_blank">
              meetup.com/vierdevrijdag
            </a>
          </h5>
        </Slide>
        <Slide style={Object.assign({}, this.state.currentSlide != 1 && {display: 'none'})}>
          <img width="250" src="https://www.thehaguetech.com/images/THT_Anim_once.gif" />
          <ul>
            <li>Tech community in The Hague</li>
            <li>Offers 'community membership' & workspaces</li>
          </ul>
          <h5>
            <a href="https://www.thehaguetech.nl/events" target="_blank">
              thehaguetech.com/events
            </a>
          </h5>
        </Slide>
        <Slide style={Object.assign({}, this.state.currentSlide != 2 && {display: 'none'})}>
          <img src="https://secure.meetupstatic.com/photos/event/3/8/1/a/600_469694362.jpeg" />
          <ul>
            <li>Community interested in blockchain & cryptocurrencies</li>
            <li>coworking days</li>
            <li>talks</li>
            <li>workshops</li>
            <li>courses</li>
          </ul>
          <h5>
            <a href="https://www.blockbar.nl/" target="_blank">
              blockbar.nl
            </a>
          </h5>
        </Slide>
        <Slide style={Object.assign({}, this.state.currentSlide != 3 && {display: 'none'})}>
          <img src="https://secure.meetupstatic.com/photos/event/2/0/5/1/600_473948273.jpeg" />
          <ul>
            <li>Community interested in AI & machine learning</li>
            <li>coworking days</li>
            <li>talks</li>
            <li>workshops</li>
            <li>courses</li>
          </ul>
          <h5>
            <a href="https://www.meetup.com/AI-Lab/" target="_blank">
              meetup.com/AI-Lab
            </a>
          </h5>
        </Slide>
      </div>
    );
  }
}

export default SlidesContainer = withTracker(() => {
  return {
  };
})(Slides);
