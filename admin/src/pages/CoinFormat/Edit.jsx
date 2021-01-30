import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCoinFormatAction, editCoinFormatAction } from '../../actions/coinFormatAction';
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

    this.successMsg = 'Coin Format has been edited.';
    this.errorMsg = 'Error! Please check it forms!';
    this.edit = this.edit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.showCoinFormatAction(this.props.match.params.id);
  }

  edit(values) {
    this.props.editCoinFormatAction(this.props.match.params.id, values);

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
    const { data, isShowLoading } = this.props.coinsFormat;

    if (isShowLoading) {
      return <Loading type="small" />;
    }

    if (typeof data.id === 'undefined' && data.id !== this.props.match.params.id) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <Title to="/coin/format">Edit Coin Format</Title>
          <Forms
            type="edit"
            openSnackbar={this.state.openSnackbar}
            snackbarType={this.state.snackbarType}
            snackbarMessage={this.state.snackbarMessage}
            handleClose={this.handleClose}
            values={{
              PS: data.PS,
              C: data.C,
              I: data.I,
              G1Hf: data.G1Hf,
              G12Hf: data.G12Hf,
              G24Hf: data.G24Hf,
              G7Df: data.G7Df,
              UF: data.UF,
              
              TF: data.TF,
              
              PThbf: data.PThbf,
              PTlaf: data.PTlaf,
              PBdf: data.PBdf,
              BPdf: data.BPdf,
              
              BTlaf: data.BTlaf,
              BThbf: data.BThbf,
              BBTdf: data.BBTdf,
              BBdf: data.BBdf,
            }}
            callback={this.edit}
          />
        </Container>
      </React.Fragment>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.any,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coinsFormat: PropTypes.object.isRequired,
  showCoinFormatAction: PropTypes.func.isRequired,
  editCoinFormatAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coinsFormat: state.coinsFormat,
});

export default connect(mapStateToProps, { showCoinFormatAction, editCoinFormatAction })(Edit);
