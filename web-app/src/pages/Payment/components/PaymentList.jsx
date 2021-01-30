import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Callout, Classes, H4 } from '@blueprintjs/core';

function PaymentList(props) {
  const statuses = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'delayed':
        return 'Delayed';
      case 'started':
      case 'created':
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Error';
      default:
        return 'Error';
    }
  };

  return (
    <React.Fragment>
      {props.payments.data.length > 0 && (
        <React.Fragment>
          <Callout className="callout-margin-top">
            <H4>Payments</H4>
          </Callout>
          <table className={classnames(Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED)}>
            <thead>
              <tr>
                <td>Package</td>
                <td>Price</td>
                <td>Status</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody>
              {!props.payments.isPaymentsLoading &&
                props.payments.data &&
                props.payments.data.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.name}</td>
                    <td>
                      {payment.currency === 'USD' && '$'}
                      {payment.price}
                    </td>
                    <td>{statuses(props.payments.statusesReverse[payment.status])}</td>
                    <td>
                      <Moment date={payment.createdAt} format="D MMMM YYYY HH:mm" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

PaymentList.propTypes = {
  payments: PropTypes.object.isRequired,
};

export default PaymentList;
