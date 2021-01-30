import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function NotificationItem(props) {
  return (
    <ListItem key={props.notification.id} button component={Link} to={`/notification/${props.notification.id}`}>
      <ListItemAvatar>
        <Avatar>
          <NotificationsNoneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.notification.name}
        secondary={<Moment date={props.notification.date} format="DD.MM.YYYY HH:mm:ss" />}
      />
    </ListItem>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;
