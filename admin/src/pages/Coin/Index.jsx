import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { coinsAction, deleteCoinAction } from '../../actions/coinAction';
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

class Coins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: false,
      snackbarType: 'success',
      snackbarMessage: null,
      successMsg: 'Congrats! Coin has been deleted.',
      errorMsg: 'Error! The coin could not be deleted.!',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.coinsAction();
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
    this.props.deleteCoinAction(this.state.activeDialogItemId);

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

        this.props.coinsAction();
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
    if (this.props.coins.isListLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Coins</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="N">Name</TableCell>
                <TableCell key="C">Coin</TableCell>
                <TableCell key="I">Type</TableCell>
                <TableCell key="PS">Position</TableCell>
                <TableCell colSpan={2} width="2%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.coins.data !== null &&
                this.props.coins.data.length > 0 &&
                this.props.coins.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.N}</TableCell>
                    <TableCell>{row.C}</TableCell>
                    <TableCell>
                      {row.I === 0 && '.'}
                      {row.I === 1 && 'Paribu'}
                      {row.I === 2 && 'BtcTurk'}
                    </TableCell>
                    <TableCell>{row.PS}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" component={Link} to={`/coin/edit/${row.id}`}>
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

Coins.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  coins: PropTypes.object.isRequired,
  coinsAction: PropTypes.func.isRequired,
  deleteCoinAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  coins: state.coins,
});

export default connect(mapStateToProps, { coinsAction, deleteCoinAction })(Coins);
