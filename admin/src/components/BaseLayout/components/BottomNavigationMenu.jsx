import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// icons
import LiveTvIcon from '@material-ui/icons/LiveTv';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function BottomNavigationMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState('dashboard');

  return (
    <Hidden smUp implementation="css">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="Exchanges"
          icon={<LiveTvIcon />}
          component={Link}
          to="/dashboard"
          value="dashboard"
        />
        <BottomNavigationAction
          label="Guidline"
          icon={<DescriptionIcon />}
          component={Link}
          to="/guidline"
          value="guidline"
        />
        <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsActiveIcon />}
          component={Link}
          to="/notifications"
          value="notifications"
        />
      </BottomNavigation>
    </Hidden>
  );
}
