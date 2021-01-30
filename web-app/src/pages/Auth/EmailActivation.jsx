import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { emailActivationAction } from '../../actions/authActions';
import { Button, Classes, Icon, Intent, Position, Toaster } from '@blueprintjs/core';
import AuthLayout from './components/AuthLayout';

const EmailActivationToaster = Toaster.create({
  className: 'email-activation',
  position: Position.TOP,
  maxToasts: 1,
});

class EmailActivation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
    };

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {}

  submitForm() {
    this.setState({ isSubmitting: true });

    this.props.emailActivationAction(this.props.match.params.code);

    EmailActivationToaster.clear();
    setTimeout(() => {
      this.setState({ isSubmitting: false });
      console.log(this.props.errors.isError);
      if (this.props.errors.isError === false) {
        EmailActivationToaster.show({
          icon: IconNames.CONFIRM,
          message: 'Congratulations! Your activation process is successful.',
          timeout: 0,
          intent: Intent.SUCCESS,
        });
      } else {
        let message = 'Error! Your activation could not be completed! Activation may have been completed earlier.';
        if (typeof this.props.errors.error.message !== 'undefined') {
          message = this.props.errors.error.message;
        }
        EmailActivationToaster.show({
          icon: IconNames.ERROR,
          message: message,
          timeout: 0,
          intent: Intent.DANGER,
        });
      }
    }, 1000);
  }

  render() {
    return (
      <AuthLayout title={'Confirm your e-mail address'}>
        <div>If you haven't verified your account before;</div>
        <Button
          icon={IconNames.CONFIRM}
          intent={Intent.PRIMARY}
          style={{ marginTop: 10 }}
          loading={this.state.isSubmitting}
          onClick={this.submitForm}
        >
          Verify now
        </Button>
        {localStorage.getItem('userToken') && (
          <div style={{ marginTop: 10 }}>
            <div>veya </div>
            <Link className={Classes.BUTTON} to={'/guidline'} style={{ marginTop: 10 }}>
              <Icon icon={IconNames.ARROW_LEFT} />
              <span>Come back</span>
            </Link>
          </div>
        )}
      </AuthLayout>
    );
  }
}

EmailActivation.propTypes = {
  emailActivationAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  emailActivation: state.emailActivation,
});

export default connect(mapStateToProps, {
  emailActivationAction,
})(EmailActivation);
