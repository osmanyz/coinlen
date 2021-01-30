import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCoinAction, editCoinAction } from '../../actions/coinAction';
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

    this.successMsg = 'Coin has been edited.';
    this.errorMsg = 'Error! Please check it forms!';
    this.edit = this.edit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.showCoinAction(this.props.match.params.id);
  }

  edit(values) {
    this.props.editCoinAction(this.props.match.params.id, values);

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
    const { data, isShowLoading } = this.props.coins;

    if (isShowLoading) {
      return <Loading type="small" />;
    }

    if (typeof data.id === 'undefined' && data.id !== this.props.match.params.id) {
      return <Loading type="small" />;
    }

    return (
      <Container maxWidth="sm">
        <Title to="/coin">Edit Coin</Title>
        <Forms
          type="edit"
          openSnackbar={this.state.openSnackbar}
          snackbarType={this.state.snackbarType}
          snackbarMessage={this.state.snackbarMessage}
          handleClose={this.handleClose}
          values={{
            PS: data.PS,
            N: data.N,
            C: data.C,
            I: data.I,
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
  coins: PropTypes.object.isRequired,
  showCoinAction: PropTypes.func.isRequired,
  editCoinAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coins: state.coins,
});

export default connect(mapStateToProps, { showCoinAction, editCoinAction })(Edit);
