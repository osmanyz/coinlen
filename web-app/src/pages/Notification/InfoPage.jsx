import React from 'react';
import classnames from 'classnames';
import { Callout, Classes, H4 } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

class InfoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [
        'ATOM',
        'XRP',
        'WAVES',
        'RVN',
        'CHZ',
        'ONT',
        'ADA',
        'BTC',
        'BAT',
        'BTT',
        'XLM',
        'LINK',
        'ETH',
        'EOS',
        'TRX',
        'HOT',
        'XTZ',
        'LTC',
        'NEO',
        'DOGE',
        'BCH',
      ],
    };
  }

  componentDidMount() {
    document.title = 'About Notifications | Coinlen';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <h3>Working Principle of Notification System</h3>
            <Callout>
              <H4>Conditions</H4>
              <p>The percentage of each of the following conditions is calculated based on the Live Price (TRY) Difference.</p>
            </Callout>
            <table className={classnames(Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED)}>
              <thead>
                <tr>
                  <td>Coin</td>
                  <td>P. % Conditions of Opportunity</td>
                  <td>B. % Conditions of Opportunity</td>
                </tr>
              </thead>
              <tbody>
                {this.state.coins.map((coin) => (
                  <tr key={coin}>
                    <td>{coin}</td>
                    <td>If +1% and above</td>
                    <td>If + 1% and above</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default InfoPage;
