import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { coinsFormatAction, deleteCoinFormatAction } from '../../actions/coinFormatAction';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AlertDialog from '../../components/Alert/AlertDialog';
import AlertSnackbar from '../../components/Alert/AlertSnackbar';
import Loading from '../../components/Loading/Loading';
import PageTitle from '../../hocs/PageTitle';
// icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class CoinsFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: false,
      snackbarType: 'success',
      snackbarMessage: null,
      successMsg: 'Congrats! Coin format has been deleted.',
      errorMsg: 'Error! Coin format could not be deleted!',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.coinsFormatAction();
  }

  handleClickOpen(id) {
    this.setState({
      openDialog: true,
      activeDialogItemId: id,
    });
  }

  handleClose() {
    this.setState({
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: null,
    });
  }

  handleConfirm() {
    this.props.deleteCoinFormatAction(this.state.activeDialogItemId);

    setTimeout(() => {
      this.setState({
        openDialog: false,
        openSnackbar: true,
        activeDialogItemId: null,
      });

      if (this.props.errors.error === null) {
        this.setState({
          snackbarType: 'success',
          snackbarMessage: this.state.successMsg,
        });

        this.props.coinsFormatAction();
        this.forceUpdate();
      } else {
        this.setState({
          snackbarType: 'error',
          snackbarMessage: this.state.errorMsg,
        });
      }
    }, 1000);
  }

  render() {
    console.log(this.props.coinsFormat);
    if (this.props.coinsFormat.isListLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Coins Format</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="PS">Position</TableCell>
                <TableCell key="C">Coin</TableCell>
                <TableCell key="I">Type</TableCell>
                <TableCell key="G24Hf">24h</TableCell>
                <TableCell key="UF">USD</TableCell>
                <TableCell key="TF">TRY</TableCell>

                <TableCell key="PBdf">Paribu to Binance % Diff.</TableCell>
                <TableCell key="BPdf">Binance to Paribu % Diff.</TableCell>
                <TableCell key="PThbf">Paribu Buying</TableCell>
                <TableCell key="PTlaf">Paribu Selling</TableCell>

                <TableCell key="BBdf">BtcTurk to Binance % Diff.</TableCell>
                <TableCell key="BBTdf">Binance to BtcTurk % Diff.</TableCell>
                <TableCell key="BThbf">BtcTurk Buying</TableCell>
                <TableCell key="BTlaf">BtcTurk Selling</TableCell>

                <TableCell colSpan={2} width="2%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.coinsFormat.data !== null &&
                this.props.coinsFormat.data.length > 0 &&
                this.props.coinsFormat.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.PS}</TableCell>
                    <TableCell>{row.C}</TableCell>
                    <TableCell>{row.I}</TableCell>
                    <TableCell>{row.G24Hf}</TableCell>
                    <TableCell>{row.UF}</TableCell>
                    <TableCell>{row.TF}</TableCell>

                    <TableCell>{row.PBdf}</TableCell>
                    <TableCell>{row.BPdf}</TableCell>
                    <TableCell>{row.PThbf}</TableCell>
                    <TableCell>{row.PTlaf}</TableCell>

                    <TableCell>{row.BBdf}</TableCell>
                    <TableCell>{row.BBTdf}</TableCell>
                    <TableCell>{row.BThbf}</TableCell>
                    <TableCell>{row.BTlaf}</TableCell>

                    <TableCell align="right">
                      <IconButton size="small" component={Link} to={`/coin/format/edit/${row.id}`}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => this.handleClickOpen(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AlertDialog
          title="Are you sure?"
          description="If you deleted it, you can't recovered it back again."
          confirmText="Continue and Delete it!"
          open={this.state.openDialog}
          handleClose={this.handleClose}
          confirm={this.handleConfirm}
        />
        <AlertSnackbar
          message={this.state.snackbarMessage ? this.state.snackbarMessage : ''}
          type={this.state.snackbarType}
          open={this.state.openSnackbar}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

CoinsFormat.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coinsFormat: PropTypes.object.isRequired,
  coinsFormatAction: PropTypes.func.isRequired,
  deleteCoinFormatAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coinsFormat: state.coinsFormat,
});

export default connect(mapStateToProps, { coinsFormatAction, deleteCoinFormatAction })(CoinsFormat);
