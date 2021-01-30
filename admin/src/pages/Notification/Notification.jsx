import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { notificationShowAction } from '../../actions/notificationAction';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Loading from '../../components/Loading/Loading';
import Title from '../../hocs/Title';

const useStyles = makeStyles((theme) => ({
  date: {
    color: theme.palette.contrastText,
    float: 'right',
    paddingTop: '0.7em',
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tableContainer: {
    marginBottom: 10,
  },
}));

const Notification = (props) => {
  const classes = useStyles();

  const { notificationShowAction } = props;
  const id = props.match.params.id;

  React.useEffect(() => {
    notificationShowAction(id);
  }, [notificationShowAction, id]);

  if (props.notifications.isNotificationShowLoading) {
    return <Loading type="small" />;
  }

  const notification = props.notifications.datum;
  const coin = JSON.parse(notification.coin);
  return (
    <React.Fragment>
      <Container className={classes.container} maxWidth="sm">
        <Title to="/notification">
          Notification
          <small className={classes.date}>
            <Moment date={notification.createdAt} format="DD.MM.YYYY HH:mm:ss" />
          </small>
        </Title>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="coins table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>{coin.N}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Coin</b>
                </TableCell>
                <TableCell>{coin.C}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Price (USD)</b>
                </TableCell>
                <TableCell>${coin.U}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Price (TRY)</b>
                </TableCell>
                <TableCell>{coin.T} TRY</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Paribu (MAX)</b>
                </TableCell>
                <TableCell>{coin.PMx} TRY</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Paribu (TRY)</b>
                </TableCell>
                <TableCell>{coin.PT} TRY</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Paribu to LIVE % Diff</b>
                </TableCell>
                <TableCell>{coin.PD}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Parib to BTC % Diff</b>
                </TableCell>
                <TableCell>{coin.PDb}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>24h %</b>
                </TableCell>
                <TableCell>{coin.G24H}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          component={Link}
          to={`/notification-delete/${notification.id}`}
          startIcon={<DeleteForeverIcon />}
          color="secondary"
        >
          Delete Notification!
        </Button>
      </Container>
    </React.Fragment>
  );
};

Notification.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  notificationShowAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationShowAction })(Notification);
