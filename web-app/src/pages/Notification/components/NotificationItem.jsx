import React from 'react';
import numeral from 'numeral';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Callout, Classes, H5 } from '@blueprintjs/core';

function NotificationItem(props) {
  return (
    <Callout>
      <Moment locale="tr" fromNow className={classnames(Classes.TEXT_MUTED, 'notification-item-date')}>
        {props.notification.date}
      </Moment>
      <H5>
        Opportunity for {props.notification.name} 
        {/* {props.notification.type === 1 && ' Buying'} */}
        {/* {props.notification.type === 2 && ' Selling'} */}
        {/* {props.notification.provider === 1 && `, Paribu`} */}
        {/* {props.notification.provider === 2 && `, BtcTurk`} */}
      </H5>
      <div className={Classes.TEXT_MUTED}>
        {props.notification.side} % Diff: <strong>{numeral(props.notification.value).format('0.00')}%</strong>
      </div>
    </Callout>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
};

export default NotificationItem;
