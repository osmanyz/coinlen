import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { coinsFormatAction, coinsHistoryAction } from '../../actions/coinAction';
import { Cell, Column, Table, TableLoadingOption } from '@blueprintjs/table';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import PremiumControl from '../Payment/components/PremiumControl';
import Title from '../../hocs/Title/PageTitle';
import { formatKeys } from './components/Coins/helpers';

class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: null,
      coins: null,
      symbol: this.props.match.params.coin ? this.props.match.params.coin : 'BTC',
      exchange: this.props.match.params.exchange,
      isCoinsSocketLoading: true,
      userToken: localStorage.getItem('userToken'),
      theme: localStorage.getItem('darkMode'),
      loading: [TableLoadingOption.CELLS, TableLoadingOption.COLUMN_HEADERS, TableLoadingOption.ROW_HEADERS],
    };

    this.changeSymbol = this.changeSymbol.bind(this);
    this.bodyTitle = document.title;
  }

  componentDidMount() {
    document.title =
      this.state.symbol +
      ' ' +
      (this.state.exchange === 'second' ? 'BtcTurk' : 'Paribu') +
      ' Borsası | ' +
      this.bodyTitle;
    this.props.coinsFormatAction();
    this.props.coinsHistoryAction(this.state.symbol);

    this.interval = setInterval(() => {
      this.props.coinsHistoryAction(this.state.symbol);
    }, 2000);

    this.timeout = setTimeout(() => {
      if (!this.props.coins.isHistoryLoading && !this.props.coins.isFormatLoading) {
        this.setState({ loading: [] });
      }
    }, 1000);
  }

  componentWillUnmount() {
    document.title = this.bodyTitle;
    clearInterval(this.interval);
    clearInterval(this.timeout);
  }

  changeSymbol(event) {
    this.setState({
      symbol: event.target.value,
    });

    this.forceUpdate();
  }

  cellRenderer = (key, coins, formats) => (rowIndex) => {
    if (coins && formats) {
      formats = formatKeys(formats);

      if (formats.size < 1) {
        return <Cell>{coins[rowIndex][key]}</Cell>;
      } else if (key === 'U') {
        return <Cell>${numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).UF)}</Cell>;
      } else if (key === 'T') {
        return <Cell>₺{numeral(coins[rowIndex][key]).format(formats.get(coins[rowIndex]['C']).TF)}</Cell>;
      } else if (key === 'D') {
        return (
          <Cell>
            <Moment date={coins[rowIndex]['D']} format="HH:mm:ss" />
          </Cell>
        );
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

    const { exchange, loading, symbol, theme } = this.state;
    const { formats, history } = this.props.coins;

    return (
      <React.Fragment>
        <Grid fluid>
          <Row>
            <Col xs={12} md={5}>
              <Title>
                {symbol} {exchange === 'second' ? 'BtcTurk' : 'Paribu'} Live Exchanges
              </Title> 
              <Table
                loadingOptions={loading}
                enableRowHeader={true}
                enableMultipleSelection={true}
                numRows={history ? history.length : 30}
              >
                <Column name="Price USD" cellRenderer={this.cellRenderer('U', history, formats)} />
                <Column name="Price TRY" cellRenderer={this.cellRenderer('T', history, formats)} />
                <Column name="Time" cellRenderer={this.cellRenderer('D', history, formats)} />
                <Column name="24h% Diff" cellRenderer={this.cellRenderer('G24H', history, formats)} />
              </Table>
            </Col>
            <Col xs={12} md={7}>
              <Title>Live Exchanges</Title>
              <div className="min-height-show">
                <TradingViewWidget
                  theme={theme === 'dark' ? Themes.DARK : Themes.LIGHT}
                  autosize={true}
                  symbol={`BINANCE:${symbol}USDT`}
                  timezone={'Europe/Istanbul'}
                  locale={'tr'}
                  toolbar_bg={'#f1f3f6'}
                  enable_publishing={true}
                  withdateranges={true}
                  range={'5d'}
                  hide_side_toolbar={false}
                  allow_symbol_change={true}
                  details={true}
                  hotlist={true}
                  calendar={true}
                  show_popup_button={true}
                  popup_width={'1000'}
                  popup_height={'650'}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  auth: PropTypes.object.isRequired,
  coins: PropTypes.object.isRequired,
  coinsFormatAction: PropTypes.func.isRequired,
  coinsHistoryAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  coins: state.coins,
});

export default connect(mapStateToProps, { coinsFormatAction, coinsHistoryAction })(Show);
