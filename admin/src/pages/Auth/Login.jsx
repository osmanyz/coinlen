import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUserAction } from '../../actions/authActions';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required!'),
  password: Yup.string().required('Required!'),
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
    };

    this.login = this.login.bind(this);
  }

  login(values) {
    this.setState({
      error: null,
    });

    this.props.loginUserAction(values);

    setTimeout(() => {
      if (this.props.errors.isError === true) {
        this.setState({
          error: 'Error! Please check it your accounts!',
        });
      }
    }, 500);
  }

  render() {
    if (localStorage.getItem('userToken')) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
            {({ submitForm, isSubmitting }) => (
              <Form className={this.props.classes.form}>
                {this.state.success && (
                  <Alert variant="filled" severity="success" style={{ marginBottom: 20 }}>
                    {this.state.success}
                  </Alert>
                )}
                {this.state.error && (
                  <Alert variant="filled" severity="error" style={{ marginBottom: 20 }}>
                    {this.state.error}
                  </Alert>
                )}
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                />
                <br />
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  autoComplete="current-password"
                />
                {isSubmitting && <LinearProgress />}
                <br />
                {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUserAction,
})(withStyles(styles)(Login));
