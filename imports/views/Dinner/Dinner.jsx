import React from 'react';

import './Dinner.css';

export default class Dinner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: ''
    } 
  }

  async componentDidMount() {
    let randomNumber = await localStorage.getItem('v2__orderId');
    if(! randomNumber) {
      randomNumber = Math.floor(Math.random()*(100-10+1)+10);
      localStorage.setItem('v2__orderId', randomNumber);
    }
    this.setState({
      code: randomNumber
    })
  }

  render() {
    return (
      <div className="Dinner">
        <h1>
          I'm attending the Networking Dinner
        </h1>
        <p>
          My dinner code is:
          <b>{this.state.code}</b>
        </p>
      </div>
    )
  }

}
