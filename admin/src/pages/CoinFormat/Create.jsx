import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCoinFormatAction } from '../../actions/coinFormatAction';
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

    this.successMsg = 'Coin has been created successfully.';
    this.errorMsg = 'Error! Please check it forms!';
    this.create = this.create.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  create(values) {
    this.props.createCoinFormatAction(values);

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
          <Title to="/coin/format">New Coin Format</Title>
          <Forms
            type="create"
            openSnackbar={this.state.openSnackbar}
            snackbarType={this.state.snackbarType}
            snackbarMessage={this.state.snackbarMessage}
            handleClose={this.handleClose}
            values={{
              PS: 1,
              I: 1,
              C: '',
              G1Hf: '0.00',
              G12Hf: '0.00',
              G24Hf: '0.00',
              G7Df: '0.00',
              UF: '0,0.[0]',

              TF: '0,0.[000000]',
              
              PTlaf: '0,0.[000000]',
              PThbf: '0,0.[000000]',
              BPdf: '0,0.[000000]',
              PBdf: '0,0.[000000]',

              BTlaf: '0,0.[000000]',
              BThbf: '0,0.[000000]',
              BBTdf: '0,0.[000000]',
              BBdf: '0,0.[000000]',
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
  coinsFormat: PropTypes.object.isRequired,
  createCoinFormatAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coinsFormat: state.coinsFormat,
});

export default connect(mapStateToProps, { createCoinFormatAction })(Create);
