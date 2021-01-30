import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmailForActivationAction } from '../../../actions/userAccountAction';
import { IconNames } from '@blueprintjs/icons';
import { Button, Callout, Classes, Icon, Intent, Popover, Position, Toaster } from '@blueprintjs/core';

const ActivateEmailToaster = Toaster.create({
  className: 'activate-email-toaster',
  position: Position.TOP,
  maxToasts: 1,
});

function ActiveteEmailAlert(props) {
  const [open, setOpen] = React.useState(false);

  if (props.auth?.user?.emailActivation) {
    return <React.Fragment />;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendTo = () => {
    props.sendEmailForActivationAction();

    ActivateEmailToaster.clear();

    setTimeout(() => {
      if (props.errors.error === null) {
        ActivateEmailToaster.show({
          message:
            'Success! Please check the spams. The confirmation email has been sent to you.',
          timeout: 10000,
          intent: Intent.SUCCESS,
        });
      } else {
        ActivateEmailToaster.show({
          message: 'Error! Something went wrong.!',
          timeout: 10000,
          intent: Intent.DANGER,
        });
      }
    }, 1000);
  };

  return (
    <Callout icon={Icon.DANGER} intent={Intent.DANGER} style={{ borderRadius: 0 }}>
      <span style={{ marginRight: 10 }}>You have to active your e-mail address.</span>
      <Popover
        position="auto"
        isOpen={open}
        enforceFocus={false}
        canEscapeKeyClose={true}
        onClose={handleClose}
        usePortal={true}
        portalClassName="poo"
      >
        <Button className="button-xs" onClick={handleOpen} text="Resend a new confirmation email" />
        <div style={{ padding: 15 }}>
          <p>Are you sure you want to send a reverification link?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
            <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
              Quit
            </Button>
            <Button
              icon={IconNames.ENVELOPE}
              intent={Intent.DANGER}
              className={Classes.POPOVER_DISMISS}
              onClick={sendTo}
            >
              Resend a new confirmation email
            </Button>
          </div>
        </div>
      </Popover>
    </Callout>
  );
}

ActiveteEmailAlert.propTypes = {
  auth: PropTypes.object.isRequired,
  sendEmailForActivationAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  userAccount: state.userAccount,
});

export default connect(mapStateToProps, { sendEmailForActivationAction })(ActiveteEmailAlert);
