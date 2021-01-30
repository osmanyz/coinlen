import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Intent } from '@blueprintjs/core';

const LogoutAlert = (props) => {
  const handleMoveCancel = () => props.setIsOpen(false);
  const handleMoveConfirm = () => {
    props.setIsOpen(false);
    window.location.href = '/logout';
  };

  return (
    <Alert
      canOutsideClickCancel={true}
      canEscapeKeyCancel={true}
      cancelButtonText="Quit!"
      confirmButtonText="Log out!"
      icon="log-out"
      isOpen={props.isOpen}
      intent={Intent.DANGER}
      onCancel={handleMoveCancel}
      onConfirm={handleMoveConfirm}
    >
      <p>Would you like to log out?</p>
    </Alert>
  );
};

LogoutAlert.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default LogoutAlert;
