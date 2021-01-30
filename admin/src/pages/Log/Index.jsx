import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logsAction, deleteLogAction } from '../../actions/logAction';
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

class Logs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      openSnackbar: false,
      activeDialogItemId: false,
      snackbarType: 'success',
      snackbarMessage: null,
      successMsg: 'Congrats! Log has been deleted.',
      errorMsg: 'Error! Log could not be deleted!',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    this.props.logsAction();
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
    this.props.deleteLogAction(this.state.activeDialogItemId);

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

        this.props.logsAction();
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
    if (this.props.logs.isLogsLoading) {
      return <Loading type="small" />;
    }

    return (
      <React.Fragment>
        <PageTitle>Logs</PageTitle>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell key="email">User</TableCell>
                <TableCell key="description">Description</TableCell>
                <TableCell key="ipAddress">IP</TableCell>
                <TableCell key="method">Method</TableCell>
                <TableCell key="type">Type</TableCell>
                <TableCell key="createdAt">Created At</TableCell>
                <TableCell colSpan={2} width="2%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.logs.data !== null &&
                this.props.logs.data.length > 0 &&
                this.props.logs.data.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.userEmail}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.ipAddress}</TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Moment date={row.createdAt} format="DD/MM/YYYY HH:mm:ss" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" component={Link} to={`/log/${row._id}`}>
                        <PageviewIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => this.handleClickOpen(row._id)}>
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

Logs.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  logs: PropTypes.object.isRequired,
  logsAction: PropTypes.func.isRequired,
  deleteLogAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  logs: state.logs,
});

export default connect(mapStateToProps, { logsAction, deleteLogAction })(Logs);
