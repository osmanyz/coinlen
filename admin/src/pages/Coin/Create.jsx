import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCoinAction } from '../../actions/coinAction';
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

    this.successMsg = 'Coin has been created.';
    this.errorMsg = 'Error! Please check it forms!';
    this.create = this.create.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  create(values) {
    this.props.createCoinAction(values);

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
      <Container maxWidth="sm">
        <Title to="/coin">Create New Coin</Title>
        <Forms
          type="create"
          openSnackbar={this.state.openSnackbar}
          snackbarType={this.state.snackbarType}
          snackbarMessage={this.state.snackbarMessage}
          handleClose={this.handleClose}
          values={{
            PS: 1,
            N: '',
            C: '',
            I: '',
          }}
          callback={this.create}
        />
      </Container>
    );
  }
}

Create.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coins: PropTypes.object.isRequired,
  createCoinAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coins: state.coins,
});

export default connect(mapStateToProps, { createCoinAction })(Create);
