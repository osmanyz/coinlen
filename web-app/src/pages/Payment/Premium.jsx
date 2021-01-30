import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentsAction, doPaymentAction } from '../../actions/paymentAction';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PremiumCard from './components/PremiumCard';
import PaymentList from './components/PaymentList';
import DoPayment from './components/DoPayment';

class Premium extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openAccountDrawer: false,
    };

    this.handleOpenAccountDrawer = this.handleOpenAccountDrawer.bind(this);
    this.handleCloseAccountDrawer = this.handleCloseAccountDrawer.bind(this);
  }

  componentDidMount() {
    document.title = 'Premium | Coinlen';

    this.props.paymentsAction();
  }

  handleOpenAccountDrawer() {
    this.setState({ openAccountDrawer: true });
  }

  handleCloseAccountDrawer() {
    this.setState({ openAccountDrawer: false });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <PremiumCard auth={this.props.auth} />
            <DoPayment
              auth={this.props.auth}
              doPayment={this.props.doPayment}
              doPaymentAction={this.props.doPaymentAction}
            />
            <PaymentList payments={this.props.payments} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Premium.propTypes = {
  auth: PropTypes.object.isRequired,
  payments: PropTypes.object.isRequired,
  paymentsAction: PropTypes.func.isRequired,
  doPayment: PropTypes.object.isRequired,
  doPaymentAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payments: state.payments,
  doPayment: state.doPayment,
});

export default connect(mapStateToProps, { paymentsAction, doPaymentAction })(Premium);