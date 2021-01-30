import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showUserAction, editUserAction } from '../../actions/userAction';
import Container from '@material-ui/core/Container';
import Loading from '../../components/Loading/Loading';
import Forms from './components/Forms';
import Title from '../../hocs/Title';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarMessage: null,
      snackbarType: 'error',
      openSnackbar: false,
    };

    this.successMsg = 'User has been edited.';
    this.errorMsg = 'Error! Please check it forms!';
    this.edit = this.edit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.showUserAction(this.props.match.params.id);
  }

  edit(values) {
    this.props.editUserAction(this.props.match.params.id, values);

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
    const { data, isShowLoading } = this.props.users;

    if (isShowLoading) {
      return <Loading type="small" />;
    }

    if (typeof data.id === 'undefined' && data.id !== this.props.match.params.id) {
      return <Loading type="small" />;
    }

    return (
      <Container maxWidth="sm">
        <Title to="/user">Edit User</Title>
        <Forms
          type="edit"
          openSnackbar={this.state.openSnackbar}
          snackbarType={this.state.snackbarType}
          snackbarMessage={this.state.snackbarMessage}
          handleClose={this.handleClose}
          values={{
            name: data.name,
            phone: data.phone ? data.phone : '',
            email: data.email,
            password: '',
            role: data.role,
            status: Boolean(data.status),
            premiumStatus: Boolean(data.premiumStatus),
            premium: data.premium,
            premiumDate: data.premiumDate,
          }}
          callback={this.edit}
        />
      </Container>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.any,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  showUserAction: PropTypes.func.isRequired,
  editUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users,
});

export default connect(mapStateToProps, { showUserAction, editUserAction })(Edit);
