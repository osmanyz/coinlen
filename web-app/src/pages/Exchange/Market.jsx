import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { coinsFormatAction } from '../../actions/coinAction';
import socket from '../../helpers/socket';
import { Classes } from '@blueprintjs/core';
import { Cell, Column, Table, TableLoadingOption } from '@blueprintjs/table';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import PremiumControl from '../Payment/components/PremiumControl';
import PageTitle from './components/PageTitle';
import Title from '../../hocs/Title/PageTitle';
import { formatKeys } from './components/Coins/helpers';

class Opportunity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: null,
      coins: null,
      symbol: 'BTC',
      isCoinsSocketLoading: true,
      userToken: localStorage.getItem('userToken'),
      theme: localStorage.getItem('darkMode'),
    };

    this.changeSymbol = this.changeSymbol.bind(this);
  }

  componentDidMount() {
    document.title = 'Live Exchanges | Coinlen';
    this.props.coinsFormatAction();

    socket.on('disconnect', () => {
      socket.connect();
      socket.emit(5, this.state.userToken);
      socket.emit(6, this.state.userToken);
    });
    socket.on('connect', () => {
      socket.emit(6, this.state.userToken);
    });
    socket.on(7, (coins) => {
      this.setState({
        isCoinsSocketLoading: false,
        coins: coins,
        currency: coins[0].CR,
      });
    });
  }

  componentWillUnmount() {
    socket.off(7);
  }

  changeSymbol(event) {
    this.setState({
      symbol: event.target.value,
    });
    this.forceUpdate();
  }

  cellRenderer = (key, coins, formats, exchange, format) => (rowIndex) => {
    if (coins && format) {
      formats = formatKeys(formats);

      if (formats.size < 1) {
        return <Cell>{coins[rowIndex][key]}</Cell>;
      } else if (key === 'U') {
        return <Cell>${numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).UF)}</Cell>;
      } else if (key === 'T') {
        return <Cell>₺{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).TF)}</Cell>;
      } else if (exchange === 'first') {
        if (key === 'PTla') {
          return <Cell>₺{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).PTlaf)}</Cell>;
        } else if (key === 'PTla') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).PTlaf)}</Cell>;
        } else if (key === 'BPd') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).BPdf)}</Cell>;
        } else if (key === 'PBd') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).PBdf)}</Cell>;
        }
      } else if (exchange === 'second') {
        if (key === 'BTla') {
          return <Cell>₺{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).BTlaf)}</Cell>;
        } else if (key === 'BThb') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).BThbf)}</Cell>;
        } else if (key === 'BBTd') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).BBTdf)}</Cell>;
        } else if (key === 'BBd') {
          return <Cell>%{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).BBdf)}</Cell>;
        }
      }
    } else if (coins) {
      return <Cell>{coins[rowIndex][key]}</Cell>;
    }

    return <Cell></Cell>;
  };

  render() {
    if (moment(this.props.auth.user.premiumDate) < new Date()) {
      return <PremiumControl auth={this.props.auth} />;
    }

    const { isCoinsSocketLoading, currency, theme } = this.state;
    const { isFormatLoading, formats } = this.props.coins;
    const loading =
      isCoinsSocketLoading && isFormatLoading
        ? [TableLoadingOption.CELLS, TableLoadingOption.COLUMN_HEADERS, TableLoadingOption.ROW_HEADERS]
        : [];

    let coins = this.state.coins;
    let paribuCoins = coins;
    let btcTurkCoins = coins;
    if (coins) {
      paribuCoins = coins.filter((c) => {
        return c.I === 0 || c.I === 1;
      });
      btcTurkCoins = coins.filter((c) => {
        return c.I === 0 || c.I === 2;
      });
    }

    return (
      <React.Fragment>
        <Grid fluid>
          <Row>
            <Col xs={12} md={3}>
              <PageTitle currency={currency} title="Paribu Exchange" />
              <Table
                loadingOptions={loading}
                enableRowHeader={true}
                enableMultipleSelection={true}
                numRows={paribuCoins ? paribuCoins.length : 21}
              >
                <Column name="Coin" cellRenderer={this.cellRenderer('C', paribuCoins, formats, 'first', false)} />
                <Column name="Price USD" cellRenderer={this.cellRenderer('U', paribuCoins, formats, 'first', true)} />
                <Column name="Price TRY" cellRenderer={this.cellRenderer('T', paribuCoins, formats, 'first', true)} />
              </Table>
              <Title>BtcTurk Exchange</Title>
              <Table
                loadingOptions={loading}
                enableRowHeader={true}
                enableMultipleSelection={true}
                numRows={btcTurkCoins ? btcTurkCoins.length : 10}
              >
                <Column name="Coin" cellRenderer={this.cellRenderer('C', btcTurkCoins, formats, 'second', false)} />
                <Column name="Price USD" cellRenderer={this.cellRenderer('U', btcTurkCoins, formats, 'second', true)} />
                <Column name="Price TRY" cellRenderer={this.cellRenderer('T', btcTurkCoins, formats, 'second', true)} />
              </Table>
            </Col>
            <Col xs={12} md={9}>
              <Title>
                Live Chart
                <div
                  className={classnames(Classes.SELECT, Classes.MINIMAL)}
                  style={{ marginTop: -9, marginLeft: 15, marginBottom: -9 }}
                >
                  <select value={this.state.symbol} onChange={this.changeSymbol}>
                    {formats &&
                      formats.map((format) => (
                        <option key={format.C} value={format.C.toString()}>
                          {format.C}
                        </option>
                      ))}
                  </select>
                </div>
              </Title>
              <div style={{ marginBottom: 20, width: '100%', height: '100%' }}>
                <TradingViewWidget
                  theme={theme === 'dark' ? Themes.DARK : Themes.LIGHT}
                  symbol={`BINANCE:${this.state.symbol}USDT`}
                  timezone={'Europe/Istanbul'}
                  locale={'tr'}
                  toolbar_bg={'#f1f3f6'}
                  enable_publishing={true}
                  withdateranges={true}
                  range={'1d'}
                  hide_side_toolbar={false}
                  allow_symbol_change={true}
                  details={true}
                  hotlist={true}
                  calendar={true}
                  show_popup_button={true}
                  popup_width={'1000'}
                  popup_height={'650'}
                  autosize={true}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

Opportunity.propTypes = {
  auth: PropTypes.object.isRequired,
  coins: PropTypes.object.isRequired,
  coinsFormatAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coins: state.coins,
});

export default connect(mapStateToProps, { coinsFormatAction })(Opportunity);
