import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function AlertSnackbar(props) {
  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={props.autoHideDuration ? props.autoHideDuration : 6000}
    >
      <MuiAlert
        onClose={props.handleClose}
        elevation={6}
        variant="filled"
        severity={props.type ? props.type : 'warning'}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
}

AlertSnackbar.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  autoHideDuration: PropTypes.number,
};

export default AlertSnackbar;
