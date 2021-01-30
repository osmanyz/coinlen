import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WindowSizes from '../../../helpers/WindowSizes';
import { updateUserAccountAction, updateUserPasswordAction } from '../../../actions/userAccountAction';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { IconNames } from '@blueprintjs/icons';
import { Button, Classes, Callout, Icon, Drawer, Tab, Tabs, Intent, Position, Toaster, H4 } from '@blueprintjs/core';
import { InputForm } from '../../../hocs/Forms/InputForm';

const AccountToaster = Toaster.create({
  className: 'account-toaster',
  position: Position.TOP,
  maxToasts: 1,
});

const AccountUpdateSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  phone: Yup.string().length(10, 'Phone number must be 10 digits.!').required('Phone is required!'),
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required!'),
});

const AccountPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required!'),
  password: Yup.string().required('Password is required!'),
  passwordConfirm: Yup.string().required('Password Confirm is required!'),
});

class UpdateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarTabId: 'Account',
    };

    this.handleNavbarTabChange = this.handleNavbarTabChange.bind(this);
  }

  handleNavbarTabChange(TabId) {
    this.setState({
      navbarTabId: TabId,
    });
  }

  _updateToaster() {
    AccountToaster.clear();

    if (this.props.errors.error === null) {
      AccountToaster.show({
        message: 'Successfull! Your account has been updated.',
        timeout: 10000,
        intent: Intent.SUCCESS,
      });

      setTimeout(() => window.location.reload(), 2100);
    } else {
      let message = 'Erro! Please check your account informations!';
      if (typeof this.props.errors.error === 'object' && this.props.errors.error !== null) {
        if (typeof this.props.errors.error.message !== 'undefined') {
          message = this.props.errors.error.message;
        }
      }

      AccountToaster.show({
        message: message,
        timeout: 10000,
        intent: Intent.DANGER,
      });
    }
  }

  updateAccount(values) {
    this.props.updateUserAccountAction(values);

    setTimeout(() => {
      this._updateToaster();
    }, 1000);
  }

  updatePassword(values) {
    this.props.updateUserPasswordAction(values);

    setTimeout(() => {
      this._updateToaster();
    }, 1000);
  }

  render() {
    const AccountPanel = (
      <Formik
        initialValues={{
          email: this.props.auth.user.email,
          name: this.props.auth.user.name,
          phone: this.props.auth.user.phone,
        }}
        validationSchema={AccountUpdateSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            this.updateAccount(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form>
            <InputForm
              label="E-mail"
              name="email"
              type="email"
              helperText="If you change your e-mail then you have to re-login." 
              required={true}
              touched={touched}
              errors={errors}
            />
            <InputForm label="Ad Soyad" name="name" type="text" required={true} touched={touched} errors={errors} />
            <InputForm
              label="Phone"
              helperText="You can only update your phone number as digits without spaces.."
              name="phone"
              type="number"
              required={true}
              touched={touched}
              errors={errors}
            />
            <Button intent="primary" style={{ marginTop: 5 }} loading={isSubmitting} onClick={submitForm}>
              Update Account
            </Button>
          </Form>
        )}
      </Formik>
    );

    const PasswordPanel = (
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={AccountPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            this.updatePassword(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <Form>
            <InputForm
              label="Current Password"
              name="currentPassword"
              type="password"
              required={true}
              touched={touched}
              errors={errors}
            />
            <InputForm
              label="New Password"
              name="password"
              type="password"
              required={true}
              touched={touched}
              errors={errors}
            />
            <InputForm
              label="Password Confirm"
              name="passwordConfirm"
              type="password"
              required={true}
              touched={touched}
              errors={errors}
            />
            <Button intent="primary" style={{ marginTop: 5 }} loading={isSubmitting} onClick={submitForm}>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    );

    return (
      <Drawer
        onClose={this.props.handleCloseAccountDrawer}
        autoFocus={true}
        canEscapeKeyClose={true}
        isOpen={this.props.openAccountDrawer}
        position={Position.RIGHT}
        title="Account Details"
        size={WindowSizes().width > 767 ? Drawer.SIZE_STANDARD : '100%'}
      >
        <Callout>
          <Icon
            icon={IconNames.USER}
            iconSize={Icon.SIZE_LARGE}
            intent={Intent.PRIMARY}
            className="profile-premium-icon"
          />
          <div className="profile-premium-text">
            <H4>{this.props.auth.user.name}</H4>
            <span>E-mail: {this.props.auth.user.email}</span>
            <span>Phone: {this.props.auth.user.phone}</span>
          </div>
        </Callout>
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Tabs
              id="navbar"
              animate={true}
              onChange={this.handleNavbarTabChange}
              selectedTabId={this.state.navbarTabId}
            >
              <Tab id="Account" title="Account Information" panel={AccountPanel} />
              <Tab id="Password" title="Password" panel={PasswordPanel} />
            </Tabs>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <Button onClick={() => this.props.handleCloseAccountDrawer()}>Quit</Button>
        </div>
      </Drawer>
    );
  }
}

UpdateAccount.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired,
  userAccount: PropTypes.object.isRequired,
  openAccountDrawer: PropTypes.bool.isRequired,
  handleCloseAccountDrawer: PropTypes.func.isRequired,
  updateUserAccountAction: PropTypes.func.isRequired,
  updateUserPasswordAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  userAccount: state.userAccount,
});

export default connect(mapStateToProps, {
  updateUserAccountAction,
  updateUserPasswordAction,
})(UpdateAccount);
