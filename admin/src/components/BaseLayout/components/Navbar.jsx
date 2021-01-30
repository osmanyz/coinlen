import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import DropdownMenu from './DropdownMenu';

const Navbar = (props) => {
  const isLight = props.theme === 'light';
  return (
    <React.Fragment>
      <MenuItem onClick={props.toggleDrawer(true)} color="inherit">
        <MonetizationOnIcon />
      </MenuItem>
      <DropdownMenu
        ariaControls="menu-appbar"
        ariaLabel="account of current user"
        iconButton={true}
        icon={<AccountCircle />}
      >
        <MenuItem onClick={props.toggleTheme} color="inherit">
          <ListItemIcon>
            {isLight && <Brightness7Icon />}
            {!isLight && <Brightness2Icon />}
          </ListItemIcon>
          <span>Dark Mode </span>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <span>Log out!</span>
        </MenuItem>
      </DropdownMenu>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Navbar;
