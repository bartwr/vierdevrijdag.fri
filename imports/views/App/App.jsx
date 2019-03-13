import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    if (location.href.indexOf('localhost') <= -1 && location.protocol !== 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      return false;
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.content}
        <p align="center">
          <small>This site is <a href="https://github.com/bartwr/vierdevrijdag.fri" target="_blank">open source</a> - feel free to contribute.</small><br /><br />
        </p>
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {
  return {}
})(App);
