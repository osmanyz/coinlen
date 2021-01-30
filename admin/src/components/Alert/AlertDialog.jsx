import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          {props.quietText ? props.quietText : 'Cancel'}
        </Button>
        <Button onClick={props.confirm} color="secondary">
          {props.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  quietText: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default AlertDialog;
