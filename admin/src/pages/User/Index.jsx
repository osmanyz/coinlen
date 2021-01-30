import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  usersAction,
  deleteUserAction,
  sendConfirmEmailAction,
  sendEmailActivationAction,
} from '../../actions/userAction';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AlertDialog from '../../components/Alert/AlertDialog';
import AlertSnackbar from '../../components/Alert/AlertSnackbar';
import Loading from '../../components/Loading/Loading';
import PageTitle from '../../hocs/PageTitle';
import PremiumRemaning from './components/PremiumRemaning';
import ActionMenu from './components/ActionMenu';
// icons
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TimerIcon from '@material-ui/icons/Timer';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openDialogEmailConfirmed: false,
      openDialogEmailActivation: false,
      openSnackbar: false,
      activeDialogItemId: null,
      activeDialogEmailConfirmedId: null,
      activeDialogEmailActivationId: null,
      snackbarType: 'success',
      snackbarMessage: null,
      successMessage: 'Congrats! Email sent',
      errorMessage: 'Error! Email did not send!',
      successMsg: 'Congrats! User has been deleted.',
      errorMsg: 'Error! User could not be deleted!',
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleEmailConfirmationOpen = this.handleEmailConfirmationOpen.bind(this);
    this.handleEmailActivationOpen = this.handleEmailActivationOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleEmailConfirmation = this.handleEmailConfirmation.bind(this);
    this.handleEmailActivation = this.handleEmailActivation.bind(this);
  }

  componentDidMount() {
    this.props.usersAction({
      role: 'user',
    });
  }

  handleClickOpen(id) {
    this.setState({
      openDialog: true,
      activeDialogItemId: id,
    });
  }

  handleEmailConfirmationOpen(id) {
    this.setState({
      openDialogEmailConfirmed: true,
      activeDialogEmailConfirmedId: id,
    });
  }

  handleEmailActivationOpen(id) {
    this.setState({
      openDialogEmailActivation: true,
      activeDialogEmailActivationId: id,
    });
  }

  handleClose() {
    this.setState({
      openDialog: false,
      openSnackbar: false,
      openDialogEmailConfirmed: false,
      openDialogEmailActivation: false,
      activeDialogItemId: null,
      activeDialogEmailConfirmedId: null,
      activeDialogEmailActivationId: null,
    });
  }

  handleConfirm() {
    this.props.deleteUserAction(this.state.activeDialogItemId);

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

        this.props.usersAction();
        this.forceUpdate();
      } else {
        this.setState({
          snackbarType: 'error',
          snackbarMessage: this.state.errorMsg,
        });
      }
    }, 1000);
  }

  handleEmailConfirmation() {
    this.props.sendConfirmEmailAction(this.state.activeDialogEmailConfirmedId);

    setTimeout(() => {
      this.setState({
        openDialogEmailConfirmed: false,
        openSnackbar: true,
        activeDialogEmailConfirmedId: null,
      });

      if (this.props.errors.error === null) {
        this.setState({
          snackbarType: 'success',
          snackbarMessage: this.state.successMessage,
        });

        this.props.usersAction();
        this.forceUpdate();
      } else {
        this.setState({
          snackbarType: 'error',
          snackbarMessage: this.state.errorMessage,
        });
      }
    }, 1000);
  }

  handleEmailActivation() {
    this.props.sendEmailActivationAction(this.state.activeDialogEmailActivationId);

    setTimeout(() => {
      this.setState({
        openDialogEmailActivation: false,
        openSnackbar: true,
        activeDialogEmailActivationId: null,
      });

      if (this.props.errors.error === null) {
        this.setState({
          snackbarType: 'success',
          snackbarMessage: this.state.successMessage,
        });

        this.props.usersAction();
        this.forceUpdate();
      } else {
        this.setState({
          snackbarType: 'error',
          snackbarMessage: this.state.errorMessage,
        });
      }
    }, 1000);
  }

  render() {
    if (this.props.users.isListLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Users</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="name">Name</TableCell>
                <TableCell key="email">Email</TableCell>
                <TableCell key="phone">Phone</TableCell>
                <TableCell key="premiumStatus">Is Premium</TableCell>
                <TableCell key="premium">Premium</TableCell>
                <TableCell key="premiumDate">Premium Date</TableCell>
                <TableCell key="premiumRemaining">Premium Date</TableCell>
                <TableCell key="status">Status</TableCell>
                <TableCell width="2%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.data !== null &&
                this.props.users.data.length > 0 &&
                this.props.users.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      {row.premiumStatus && (
                        <Chip size="small" label="Active" color="primary" icon={<MonetizationOnIcon />} />
                      )}
                      {!row.premiumStatus && (
                        <Chip size="small" color="secondary" label="Passive" icon={<TimerIcon />} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.premium.charAt(0).toUpperCase() + row.premium.slice(1)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Moment date={row.premiumDate} format="DD/MM/YYYY HH:mm:ss" />
                    </TableCell>
                    <TableCell>
                      <PremiumRemaning date={row.premiumDate} />
                    </TableCell>
                    <TableCell>
                      {Boolean(row.status) === true && <Chip size="small" label="Active" color="primary" />}
                      {Boolean(row.status) === false && <Chip size="small" label="Passive" color="secondary" />}
                      {row.role === 'admin' && '(THIS USER IS ADMIN)'}
                    </TableCell>
                    <TableCell align="right">
                      <ActionMenu
                        row={row}
                        handleClickOpen={(e) => this.handleClickOpen(row.id)}
                        handleEmailConfirmationOpen={(e) => this.handleEmailConfirmationOpen(row.id)}
                        handleEmailActivationOpen={(e) => this.handleEmailActivationOpen(row.id)}
                      />
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
        <AlertDialog
          title="Are you sure?"
          description="Do you want to send it to the user this email?"
          confirmText="Continue and Send it!"
          open={this.state.openDialogEmailConfirmed}
          handleClose={this.handleClose}
          confirm={this.handleEmailConfirmation}
        />
        <AlertDialog
          title="Are you sure?"
          description="Do you want to send it to the user this email?"
          confirmText="Continue and Send it!"
          open={this.state.openDialogEmailActivation}
          handleClose={this.handleClose}
          confirm={this.handleEmailActivation}
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

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  usersAction: PropTypes.func.isRequired,
  deleteUserAction: PropTypes.func.isRequired,
  sendConfirmEmailAction: PropTypes.func.isRequired,
  sendEmailActivationAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users,
});

export default connect(mapStateToProps, {
  usersAction,
  deleteUserAction,
  sendConfirmEmailAction,
  sendEmailActivationAction,
})(Users);
