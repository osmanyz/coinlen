import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUserAction } from '../../actions/authActions';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, Intent, Position, Toaster } from '@blueprintjs/core';
import AuthLayout from './components/AuthLayout';
import { InputForm } from '../../hocs/Forms/InputForm';

const LoginToaster = Toaster.create({
  className: 'login-toaster',
  position: Position.TOP,
  maxToasts: 1,
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid e-mail address').required('E-mail is required!'),
  password: Yup.string().required('Password is required!'),
});

class Login extends React.Component {
  componentDidMount() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('bp3-dark');
      document.body.classList.remove('bp3-body');
    }
  }

  componentWillUnmount() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.remove('bp3-dark');
      document.body.classList.add('bp3-body');
    }
  }

  login(values) {
    this.props.loginUserAction(values);

    LoginToaster.clear();
    setTimeout(() => {
      if (this.props.errors.isError === false) {
        LoginToaster.show({
          message: 'Success! You are being redirected to the application, please wait!',
          timeout: 10000,
          intent: Intent.SUCCESS,
        });
      } else {
        let message = 'Error! Please check your information!';
        if (typeof this.props.errors.error.message !== 'undefined') {
          message = this.props.errors.error.message;
        }
        LoginToaster.show({
          message: message,
          timeout: 10000,
          intent: Intent.DANGER,
        });
      }
    }, 1000);
  }

  render() {
    if (localStorage.getItem('userToken')) {
      return <Redirect to="/" />;
    }

    return (
      <AuthLayout title={'Log in'}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              this.login(values);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <InputForm
                label="E-mail"
                name="email"
                type="email"
                required={true}
                touched={touched}
                errors={errors}
              />
              <InputForm
                label="Password"
                name="password"
                type="password"
                required={true}
                touched={touched}
                errors={errors}
              />
              <Button intent={Intent.PRIMARY} style={{ marginTop: 5 }} loading={isSubmitting} onClick={submitForm}>
                Log in
              </Button>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUserAction,
})(Login);
