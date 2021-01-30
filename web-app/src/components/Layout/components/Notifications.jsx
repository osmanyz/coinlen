import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Button, Classes, Icon, Popover, Position, Menu, NonIdealState, Spinner } from '@blueprintjs/core';
import { latestNotificationsAction } from '../../../actions/notificationAction';

function Notifications(props) {
  const notifications = () => {
    setTimeout(() => props.latestNotificationsAction(), 300);
  };

  return (
    <Popover
      content={
        <Menu>
          {props.notifications.isLatestNotificationsLoading && (
            <li style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Spinner size={Spinner.SIZE_SMALL} />
            </li>
          )}
          {!props.notifications.isLatestNotificationsLoading && props.notifications.latest.length === 0 && (
            <li style={{ paddingTop: 20, paddingBottom: 25 }}>
              <NonIdealState icon={IconNames.NOTIFICATIONS_UPDATED} />
            </li>
          )}
          {!props.notifications.isLatestNotificationsLoading && (
            <React.Fragment>
              {props.notifications.latest &&
                props.notifications.latest.map((notification) => (
                  <li className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)} key={notification.id}>
                    <Link
                      to={`/notification/${notification.id}/${notification.name}`}
                      className={classnames(Classes.POPOVER_DISMISS, 'dropdown-menu-link')}
                    >
                      <div>
                        For <strong>{notification.name}</strong> opportuniy
                        {/* {notification.type === 1 ? 'Buying' : 'Selling'} */}
                        {/* {notification.provider === 1 && `, Paribu`} */}
                        {/* {notification.provider === 2 && `, BtcTurk`} */}
                      </div>
                      <strong style={{ marginRight: 5 }}>
                        {notification.side} % Fark: {numeral(notification.value).format('0.00')}%
                      </strong>{' '}
                      |{' '}
                      <Moment
                        locale="tr"
                        element="span"
                        interval={1000}
                        fromNow
                        style={{ textTransform: 'capitalize' }}
                      >
                        {notification.date}
                      </Moment>
                    </Link>
                  </li>
                ))}
              <Menu.Divider />
              <li>
                <Link to={'/notifications'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.NOTIFICATIONS} />
                  <span>All Notifications</span>
                </Link>
              </li>
              <li>
                <Link to={'/notification/info'} className={classnames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS)}>
                  <Icon icon={IconNames.NOTIFICATIONS_UPDATED} />
                  <span>About Notifications</span>
                </Link>
              </li>
            </React.Fragment>
          )}
        </Menu>
      }
      position={Position.BOTTOM_LEFT}
    >
      <Button
        onClick={notifications}
        className={Classes.MINIMAL}
        icon="notifications"
        disabled={moment(props.auth.user.premiumDate) < new Date() ? true : false}
      />
    </Popover>
  );
}

Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  latestNotificationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, { latestNotificationsAction })(Notifications);
