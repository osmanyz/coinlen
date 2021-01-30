import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles(() => ({
  drawer: {
    width: 220,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 220,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant={props.sidebarVariant}
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={props.onClose}
    >
      <div className={classes.drawerContainer}>
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/payment">
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Invoice Payments" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/user">
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/user/create">
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create User" />
          </ListItem>{' '}
          <ListItem button component={Link} to="/user/admin">
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Admins" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/coin">
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Coins" />
          </ListItem>
          <ListItem button component={Link} to="/coin/create">
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Coin" />
          </ListItem>
          <ListItem button component={Link} to="/coin/format">
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Coins Format" />
          </ListItem>
          <ListItem button component={Link} to="/coin/format/create">
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Create C. Format" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/notification">
            <ListItemIcon>
              <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button component={Link} to="/log">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  sidebarVariant: PropTypes.string,
  onClose: PropTypes.any,
};

export default Sidebar;
