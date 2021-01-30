import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function ActionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button aria-controls={`action-menu-${props.row.id}`} aria-haspopup="true" onClick={handleClick}>
        <MenuOpenIcon />
      </Button>
      <Menu
        key={props.row.id}
        id={`action-menu-${props.row.id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} onClick={handleClose} to={`/user/edit/${props.row.id}`}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <span>Edit</span>
        </MenuItem>

        <MenuItem onClick={props.handleClickOpen}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <span>Delete</span>
        </MenuItem>
      </Menu>
    </div>
  );
}

ActionMenu.propTypes = {
  row: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleEmailConfirmationOpen: PropTypes.func.isRequired,
  handleEmailActivationOpen: PropTypes.func.isRequired,
};
