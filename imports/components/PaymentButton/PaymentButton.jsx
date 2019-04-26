import React from 'react';

import './PaymentButton.css';

class SessionDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  initPayment() {
    document.location = 'https://useplink.com/payment/bzpQPE4ednwzakFnGf3W';
  }

  // getPaymentUrl :: Object invoice -> void
  getPaymentUrl() {

    const callback = (err, res) => {
      if (err) {
        console.log(err);
        alert(err);
      } else {
        // Success!
        console.log(res);
        document.location = res.paymentUrl;
      }
    }

    let randomString = Math.random().toString(36).substring(7);

    localStorage.setItem('v2__orderId', randomString);

    Meteor.call('mollie.insertPayment', {
      orderId: randomString,
      molliePaymentId: '',
      molliePaymentStatus: 'open'
    }, function() {
      Meteor.call('mollie.doPayment', {
        amount: 15,
        description: 'Networking Dinner! @ #vierdevrijdag',
        redirectUrl: 'https://www.vierdevrijdag.info/dinner?r=' + randomString,
        webhookUrl: 'https://www.vierdevrijdag.info/webhook/' + randomString
      }, callback);
    });

  }

  render() {
    return (
      <div className="PaymentButton">
        <button onClick={() => this.initPayment()}>
          Pay for Networking Dinner
        </button>
      </div>
    )
  }

}

export default SessionDetails;
