import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { paymentsAction } from '../../actions/paymentAction';
// material
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Loading from '../../components/Loading/Loading';
import Chart from './components/Chart';
import Deposits from './components/Deposits';
import InvoicePayment from './components/InvoicePayment';

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 240,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCoinsLoading: false,
      currency: null,
      coins: null,
    };
  }

  componentDidMount() {
    this.props.paymentsAction();
  }

  componentWillUnmount() {}

  render() {
    const { isCoinsLoading } = this.state;

    if (isCoinsLoading) {
      return <Loading type="small" />;
    }

    const fixedHeightPaper = this.props.classes.inPaper + ' ' + this.props.classes.fixedHeight;

    return (
      <React.Fragment>
        <div className={this.props.classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits payments={this.props.payments} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.props.classes.inPaper}>
                <InvoicePayment payments={this.props.payments} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>Coinlen.com</Box>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  payments: PropTypes.object.isRequired,
  paymentsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  payments: state.payments,
});

export default connect(mapStateToProps, { paymentsAction })(withStyles(styles)(Dashboard));
