import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { latestNotificationsAction } from '../../../actions/notificationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import DropdownMenu from './DropdownMenu';
import Loading from '../../Loading/Loading';
import NotificationItem from '../../../hoc/NotificationItem';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

const Notifications = (props) => {
  return (
    <DropdownMenu
      ariaControls="menu-appbar"
      ariaLabel="notifications list"
      aria-haspopup="true"
      iconButton={true}
      icon={<NotificationsActiveIcon />}
      handleMenuCallback={() => {
        props.latestNotificationsAction();
      }}
    >
      {props.notifications.latest.length === 0 && (
        <ListItem>
          <ListItemText primary="Herhangi bir bildirim yok..." />
        </ListItem>
      )}
      {props.notifications.isLatestNotificationsLoading && <Loading type="small" />}
      {!props.notifications.isLatestNotificationsLoading && (
        <List>
          {props.notifications.latest &&
            props.notifications.latest.map((notification) => (
              <NotificationItem notification={notification} key={notification._id} />
            ))}
          {props.notifications.latest && props.notifications.latest.length > 0 && (
            <React.Fragment>
              <Divider />
              <ListItem button component={Link} to="/notifications">
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="Tüm Bildirimler" />
              </ListItem>
            </React.Fragment>
          )}
        </List>
      )}
    </DropdownMenu>
  );
};

Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  latestNotificationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { latestNotificationsAction })(Notifications);
