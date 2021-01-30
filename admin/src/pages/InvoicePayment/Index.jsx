import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { paymentsAction, deletePaymentAction } from '../../actions/paymentAction';
// material
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
import PageviewIcon from '@material-ui/icons/Pageview';
import DeleteIcon from '@material-ui/icons/Delete';

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: false,
      snackbarType: 'success',
      snackbarMessage: null,
      successMsg: 'Congrats! Payment has been deleted.',
      errorMsg: 'Error! Payment could not be deleted!',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.paymentsAction();
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
    this.props.deletePaymentAction(this.state.activeDialogItemId);

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

        this.props.paymentsAction();
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
    if (this.props.payments.isPaymentsLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Invoice Payments</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="createdAt">Created At</TableCell>
                <TableCell key="price">Price</TableCell>
                <TableCell key="name">Name</TableCell>
                <TableCell key="email">User</TableCell>
                <TableCell key="status">Status</TableCell>
                <TableCell colSpan={2} width="2%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.payments.data !== null &&
                this.props.payments.data.length > 0 &&
                this.props.payments.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Moment date={row.createdAt} format="DD.MM.YYYY HH:mm:ss" />
                    </TableCell>
                    <TableCell>
                      {row.currency === 'USD' && '$'}
                      {row.price}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{this.props.payments.statusesReverse[row.status]}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" component={Link} to={`/payment/${row.id}`}>
                        <PageviewIcon />
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

Payments.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  payments: PropTypes.object.isRequired,
  paymentsAction: PropTypes.func.isRequired,
  deletePaymentAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  payments: state.payments,
});

export default connect(mapStateToProps, { paymentsAction, deletePaymentAction })(Payments);
