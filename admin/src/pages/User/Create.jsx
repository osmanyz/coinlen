import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserAction } from '../../actions/userAction';
import Container from '@material-ui/core/Container';
import Forms from './components/Forms';
import Title from '../../hocs/Title';

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar: false,
      snackbarType: 'error',
      snackbarMessage: null,
    };

    this.successMsg = 'User has been created.';
    this.errorMsg = 'Error! Please check it forms!';
    this.create = this.create.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  create(values) {
    this.props.createUserAction(values);

    setTimeout(() => {
      if (this.props.errors.error !== null) {
        this.setState({
          openSnackbar: true,
          snackbarType: 'error',
          snackbarMessage: this.props.errors.error.message ? this.props.errors.error.message : this.errorMsg,
        });
      } else {
        this.setState({
          openSnackbar: true,
          snackbarType: 'success',
          snackbarMessage: this.successMsg,
        });
      }
    }, 500);
  }

  handleClose() {
    this.setState({
      openSnackbar: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <Title to="/user">Create New User</Title>
          <Forms
            type="create"
            openSnackbar={this.state.openSnackbar}
            snackbarType={this.state.snackbarType}
            snackbarMessage={this.state.snackbarMessage}
            handleClose={this.handleClose}
            values={{
              name: '',
              phone: '',
              email: '',
              password: '',
              role: 'user',
              status: false,
              premiumStatus: false,
              premium: 'trial',
              premiumDate: new Date(),
            }}
            callback={this.create}
          />
        </Container>
      </React.Fragment>
    );
  }
}

Create.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  createUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users,
});

export default connect(mapStateToProps, { createUserAction })(Create);
