import React from 'react';

import './SessionDetails.css';

class SessionDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  clickOverlay(e) {
    if(e.target.classList.contains('SessionDetails')) {
      this.props.close();
    }
  }

  render() {
    const startTime = this.props.session.startTime;
    const startHour = startTime.substr(0, 2);
    const startMinutes = startTime.substr(3, 2) / 60 * 100;
    return (
      <div className="SessionDetails" onClick={this.clickOverlay.bind(this)}>
        <div className="SessionDetails-inner">
          <div className="SessionDetails-close" onClick={() => this.props.close()}>
            <svg
              className="close-icon"
              viewBox="0 0 20 20">
              <path d="M10.13 11.19L0 1.06 1.062 0l9.07 9.07L19.2 0l1.062 1.06-10.13 10.13zm9.07 9.07l-9.07-9.07-9.068 9.07L0 19.2 10.13 9.07 20.262 19.2 19.2 20.26z"></path>
            </svg>
          </div>
          <div className="SessionDetails-title">
            {this.props.session.title}
          </div>
          <div className="SessionDetails-meta">
            <div hidden={! this.props.session.host}>Host: {this.props.session.host}</div>
            Space: {this.props.session.space}<br />
            Start time: {startHour}:{startMinutes.toFixed(0)}<br />
            Length: {this.props.session.lengthInMinutes} minutes
          </div>
          <div className="SessionDetails-description">
            {this.props.session.description}
          </div>
        </div>
      </div>
    )
  }

}

export default SessionDetails;
