import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { usersAction, deleteUserAction } from '../../actions/userAction';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
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

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: false,
      snackbarType: 'success',
      snackbarMessage: null,
      successMsg: 'Congrats! User has been deleted.',
      errorMsg: 'Error! User could not be deleted!',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.usersAction({
      role: 'admin',
    });
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

  render() {
    if (this.props.users.isListLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Admins</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="name">Name</TableCell>
                <TableCell key="email">Email</TableCell>
                <TableCell key="phone">Phone</TableCell>
                <TableCell key="role">Role</TableCell>
                <TableCell key="status">Status</TableCell>
                <TableCell colSpan={2} width="2%" align="right">
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
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      {Boolean(row.status) === true && <Chip size="small" label="Active" color="primary" />}
                      {Boolean(row.status) === false && <Chip size="small" label="Passive" color="info" />}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" component={Link} to={`/user/edit/${row.id}`}>
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

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  usersAction: PropTypes.func.isRequired,
  deleteUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users,
});

export default connect(mapStateToProps, { usersAction, deleteUserAction })(Admin);
