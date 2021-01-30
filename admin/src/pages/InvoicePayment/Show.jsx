import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showPaymentAction } from '../../actions/paymentAction';
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
    this.props.showPaymentAction(this.props.match.params.id);
  }

  render() {
    const { classes, payments } = this.props;

    if (payments.isPaymentShowLoading) {
      return <Loading type="small" />;
    }

    const { datum, statusesReverse } = payments;
    const payment = datum;

    return (
      <Container className={classes.container} maxWidth="sm">
        <Title to="/payment">Invoice Payment</Title>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table aria-label="coins table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <b>Package</b>
                </TableCell>
                <TableCell>
                  {payment.name} <br /> {payment.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Price</b>
                </TableCell>
                <TableCell>
                  {payment.currency === 'USD' && '$'}
                  {payment.price}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>User</b>
                </TableCell>
                <TableCell>{payment.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Old Premium</b>
                </TableCell>
                <TableCell>{payment.oldPremiumStatus ? 'Active' : 'Passive'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Old Premium Package</b>
                </TableCell>
                <TableCell>{payment.oldPremium}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Old Premium Date</b>
                </TableCell>
                <TableCell>
                  <Moment date={payment.oldPremiumDate} format="DD.MM.YYYY HH:mm:ss" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>New Premium</b>
                </TableCell>
                <TableCell>{payment.newPremium && (payment.newPremiumStatus ? 'Active' : 'Passive')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>New Premium Package</b>
                </TableCell>
                <TableCell>{payment.newPremium}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>New Premium Date</b>
                </TableCell>
                <TableCell>
                  {payment.newPremiumDate && <Moment date={payment.newPremiumDate} format="DD.MM.YYYY HH:mm:ss" />}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>{statusesReverse[payment.status]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell>
                  <Moment date={payment.createdAt} format="DD.MM.YYYY HH:mm:ss" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

Show.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.any,
  payments: PropTypes.object.isRequired,
  showPaymentAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  payments: state.payments,
});

export default connect(mapStateToProps, { showPaymentAction })(withStyles(styles)(Show));
