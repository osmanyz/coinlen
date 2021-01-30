import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showLogAction } from '../../actions/logAction';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../components/Loading/Loading';
import Title from '../../hocs/Title';

const styles = (theme) => ({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  date: {
    color: theme.palette.contrastText,
    float: 'right',
    paddingTop: '0.7em',
  },
  tableContainer: {
    marginBottom: 10,
  },
});

class Show extends React.Component {
  componentDidMount() {
    this.props.showLogAction(this.props.match.params.id);
  }

  render() {
    const { classes, logs } = this.props;

    if (logs.isLogShowLoading) {
      return <Loading type="small" />;
    }

    const { datum } = logs;

    return (
      <Container maxWidth="sm">
        <Title to="/log">Log</Title>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="coins table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>User</b>
                </TableCell>
                <TableCell>{datum.userEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Type</b>
                </TableCell>
                <TableCell>{datum.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Path</b>
                </TableCell>
                <TableCell>{datum.path}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Method</b>
                </TableCell>
                <TableCell>{datum.method}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>{datum.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>IP</b>
                </TableCell>
                <TableCell>{datum.ipAddress}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>User Agent</b>
                </TableCell>
                <TableCell>{datum.userAgent}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>URL</b>
                </TableCell>
                <TableCell>{datum.url}</TableCell>
              </TableRow>
              {datum.error && datum.error.error && (
                <TableRow>
                  <TableCell>
                    <b>Error </b>
                  </TableCell>
                  <TableCell>{datum.error.error}</TableCell>
                </TableRow>
              )}
              {datum.error && datum.error.errorInfo && (
                <TableRow>
                  <TableCell>
                    <b>Error Info</b>
                  </TableCell>
                  <TableCell>{datum.error.errorInfo}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell>
                  <Moment date={datum.createdAt} format="DD.MM.YYYY HH:mm:ss" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {datum.request && typeof datum.request === 'object' && (
          <TableContainer className={classes.tableContainer} component={Paper}>
            <h4 style={{ marginLeft: 15 }}>Headers</h4>
            <Table aria-label="coins table">
              <TableBody>
                {Object.entries(datum.request).map((req, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      <b>{req[0]}</b>
                    </TableCell>
                    <TableCell>{req[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    );
  }
}

Show.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.any,
  logs: PropTypes.object.isRequired,
  showLogAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  logs: state.logs,
});

export default connect(mapStateToProps, { showLogAction })(withStyles(styles)(Show));
