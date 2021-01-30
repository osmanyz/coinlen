import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { coinsFormatAction } from '../../actions/coinAction';
// import { Callout, H5 } from '@blueprintjs/core';
import socket from '../../helpers/socket';
import PageTitle from './components/PageTitle';
import TableList from './components/Coins/Table/SecondTableList';
import MobileList from './components/Coins/Mobile/SecondMobileList';
import WindowSizes from '../../helpers/WindowSizes';
import PollingStatus from './components/Coins/PollingStatus';
import PremiumControl from '../Payment/components/PremiumControl';
import {
  _opportunityText,
  _opportunityBg,
  _twentyFourHours,
  _checkPreviousPrice,
  _bitcoinOpportunity,
  _opportunityTextMobile,
  formatKeys,
} from './components/Coins/helpers';

class SecondExchange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: null,
      coins: null,
      currency: null,
      isStopBoradcast: false,
      isCoinsSocketLoading: true,
      userToken: localStorage.getItem('userToken'),
    };

    this.timeJob = null;
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    document.title = 'BtcTurk Live Exchange | Coinlen';
    this.props.coinsFormatAction();

    socket.on('disconnect', () => {
      socket.connect();
      socket.emit(5, localStorage.getItem('userToken'));
      socket.emit(6, localStorage.getItem('userToken'));
    });

    socket.on(7, (coins) => {
      this.setState({
        isCoinsSocketLoading: false,
        coins: coins,
        currency: coins[0].CR,
        time: coins[0].D,
      });
    });

    this.timeJob = setInterval(() => {
      if (new Date().getTime() - this.state.time > 10000) {
        this.setState({
          isStopBoradcast: true,
        });
      } else if (this.state.isStopBoradcast) {
        this.setState({
          isStopBoradcast: false,
        });
      }
    }, 2000);
  }

  componentWillUnmount() {
    socket.off(7);
    clearInterval(this.timeJob);
  }

  show(coin) {
    return this.props.history.push(`/exchange/second/${coin}`);
  }

  render() {
     if (moment(this.props.auth.user.premiumDate) < new Date()) {
       return <PremiumControl auth={this.props.auth} />;
     }

    const { isCoinsSocketLoading, coins, currency, time, isStopBoradcast } = this.state;
    const { isFormatLoading, formats } = this.props.coins;

    return (
      <React.Fragment>
        <PollingStatus isStopBoradcast={isStopBoradcast} />
        <PageTitle currency={currency} time={time} title="BtcTurk Live Exchange" />
        <React.Fragment>
          {WindowSizes().width > 767 && (
            <TableList
              show={this.show}
              coins={!isCoinsSocketLoading ? coins : []}
              isCoinsLoading={isCoinsSocketLoading}
              formats={!isFormatLoading ? formatKeys(formats) : {}}
              isFormatLoading={isFormatLoading}
              _opportunityText={_opportunityText}
              _opportunityBg={_opportunityBg}
              _twentyFourHours={_twentyFourHours}
              _checkPreviousPrice={_checkPreviousPrice}
              _bitcoinOpportunity={_bitcoinOpportunity}
            />
          )}
          {WindowSizes().width <= 767 && (
            <MobileList
              show={this.show}
              coins={!isCoinsSocketLoading ? coins : []}
              isCoinsLoading={isCoinsSocketLoading}
              formats={!isFormatLoading ? formatKeys(formats) : {}}
              isFormatLoading={isFormatLoading}
              _opportunityText={_opportunityText}
              _opportunityBg={_opportunityBg}
              _opportunityTextMobile={_opportunityTextMobile}
              _checkPreviousPrice={_checkPreviousPrice}
            />
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

SecondExchange.propTypes = {
  auth: PropTypes.object.isRequired,
  coins: PropTypes.object.isRequired,
  coinsFormatAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coins: state.coins,
});

export default connect(mapStateToProps, { coinsFormatAction })(SecondExchange);
