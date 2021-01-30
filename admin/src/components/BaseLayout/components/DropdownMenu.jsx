import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const DropdownMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    if (props.handleMenuCallback) {
      props.handleMenuCallback();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {props.iconButton && (
        <IconButton
          aria-label={props.ariaLabel}
          aria-controls={props.ariaControls}
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
        >
          {props.icon}
        </IconButton>
      )}
      {props.button && (
        <Button
          aria-label={props.ariaLabel}
          aria-controls={props.ariaControls}
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
        >
          {props.icon} {props.buttonText}
        </Button>
      )}
      <Menu
        id={props.ariaControls}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.children}
      </Menu>
    </div>
  );
};

DropdownMenu.propTypes = {
  ariaControls: PropTypes.any,
  ariaLabel: PropTypes.any,
  icon: PropTypes.any,
  iconButton: PropTypes.any,
  buttonText: PropTypes.any,
  button: PropTypes.any,
  children: PropTypes.any,
  handleMenuCallback: PropTypes.func,
};

export default DropdownMenu;
