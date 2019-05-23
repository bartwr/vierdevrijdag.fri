import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import './App.css';

import QrCodeScanner from '../../components/QrCodeScanner/QrCodeScanner.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showQrCodeScanner: false
    } 
  }

  componentDidMount() {
    if (location.href.indexOf('localhost') <= -1 && location.protocol !== 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      return false;
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="nav">
          <div />
          <div className="title">
            vierde vrijdag
          </div>
          <div align="right">
            <a className="scan-qr" onClick={() => this.setState({ showQrCodeScanner: true })} />
          </div>
        </nav>
        {this.props.content}
        <p align="center">
          <small>This site is <a href="https://github.com/bartwr/vierdevrijdag.fri" target="_blank">open source</a> - feel free to contribute.</small><br /><br />
        </p>
        {this.state.showQrCodeScanner
          ? <QrCodeScanner hideQrCodeScanner={() => this.setState({ showQrCodeScanner: false })} />
          : ''
        }
      </div>
    );
  }
}

export default AppContainer = withTracker(() => {
  return {}
})(App);
