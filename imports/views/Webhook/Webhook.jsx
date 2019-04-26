import React from 'react';

// import './PaymentButton.css';

export default class Dinner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let payment = mollie.payments.get(payment.id)
  }

  render() {
    return (
      <div>
        ...
      </div>
    )
  }

}
