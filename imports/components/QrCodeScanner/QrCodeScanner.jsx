import React, { Component } from 'react';
import {
  convertURIToImageData,
  getLocalStorageVar,
  setLocalStorageVar,
  assetsPath,
} from '../../actions/utils';
import jsQR from 'jsqr';
import ReactDOM from 'react-dom';
// import adapter from 'webrtc-adapter';

// import Button from '../Button/Button';

// Import styles
import './QrCodeScanner.css';

class QrCodeScanner extends Component {

  constructor(props) {
    super(props)

    this.constraints = { video: {facingMode: "environment"}, audio: false };

    this.state = {
      showCanvasElement: true,
      showOutputContainer: false
    }
  }

  componentDidMount() {
    this.initCamera();
  }

  componentWillUnmount() {
    this.stopCameraStream();
  }

  initCamera() {
    var video = document.createElement("video");
    this.startCameraStream(video)
  }

  handleSuccess(video, stream) {
    window.stream = stream; // make variable available to browser console
    // console.log('Got stream with constraints:', this.constraints);

    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();

    requestAnimationFrame(this.tick.bind(this, video));

  }

  handleError(error) {
    console.log(error)
    if (error.name === 'ConstraintNotSatisfiedError') {
      let v = this.constraints.video;
      alert(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      alert('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    alert(`getUserMedia error: ${error.name}`, error);
  }

  async startCameraStream(video) {
    if (! navigator.mediaDevices) {
      console.log("Sorry, getUserMedia is not supported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.handleSuccess(video, stream);
    } catch (e) {
      this.handleError(e);
    }
  }

  stopCameraStream() {
    // Stop recording camera
    if(this.stream) {
      this.stream.getTracks().forEach(track => track.stop()) 
    }
  }

  drawLine(canvas, begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  tick(video) {
    let canvasElement = ReactDOM.findDOMNode(this.refs.cameraCanvas);
    if(! canvasElement) return;
    let canvas = canvasElement.getContext("2d");
    let outputContainer = ReactDOM.findDOMNode(this.refs.output);
    let outputMessage = ReactDOM.findDOMNode(this.refs.outputMessage);
    let outputData = ReactDOM.findDOMNode(this.refs.outputData);

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.hidden = false;
      canvasElement.width = video.videoWidth * (this.refs.QrCodeScanner.clientWidth / video.videoWidth);
      canvasElement.height = video.videoHeight * (this.refs.QrCodeScanner.clientWidth / video.videoWidth);
      // console.log(video.videoWidth, video.videoHeight, canvasElement.width, canvasElement.height)
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        this.drawLine(canvas, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(canvas, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(canvas, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(canvas, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        this.foundQr(code);
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
        requestAnimationFrame(this.tick.bind(this, video));
      }
    } else {
      requestAnimationFrame(this.tick.bind(this, video));
    }

  }

  parseBitcoinURL(url) {
    var r = /^bitcoin:([a-zA-Z0-9]{27,34})(?:\?(.*))?$/;
    var match = r.exec(url);
    if (!match) return null;

    var parsed = { url: url }

    if (match[2]) {
      var queries = match[2].split('&');
      for (var i = 0; i < queries.length; i++) {
        var query = queries[i].split('=');
        if (query.length == 2) {
          parsed[query[0]] = decodeURIComponent(query[1].replace(/\+/g, '%20'));
        }
      }
    }

    parsed.address = match[1];
    return parsed;
  }

  parseQrData(data) {
    // Check if QR code is a URL
    if (data.indexOf('bitcoin:') > -1) {
      const parsedUrl = this.parseBitcoinURL(data);
      prompt('Send to this address:', parsedUrl.address);
      prompt('Send this amount:', parsedUrl.amount);
    } else if (data.indexOf('https://') > -1) {
      document.location = data;
    } else {
      console.log('QR code was no valid URL')
    }
  }

  foundQr(code) {
    this.parseQrData(code.data);
    this.props.hideQrCodeScanner();
  }

  render() {
    return (
      <div className="QrCodeScanner" ref="QrCodeScanner">
        <canvas id="canvas" className="QrCodeScanner-canvas" ref="cameraCanvas" style={{
          display: this.state.showCanvasElement ? 'block' : 'none'
        }}></canvas>
        <div id="output" style={{
          display: this.state.showOutputContainer ? 'block' : 'none'
          }}>
          <div id="outputMessage" ref="outputMessage">No QR code detected.</div>
          <div hidden><b>Data:</b> <span id="outputData" ref="outputData"></span></div>
        </div>
        <br />
        <button
          type="transparent"
          className="button"
          onClick={() => this.props.hideQrCodeScanner()}
          >
          Cancel
        </button>
      </div>
    );
  }
}

export default QrCodeScanner;
