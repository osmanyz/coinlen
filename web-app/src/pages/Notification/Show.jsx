import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconNames } from '@blueprintjs/icons';
import { Classes, H5, Icon, Spinner } from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { notificationShowAction } from '../../actions/notificationAction';
import NotificationItem from './components/NotificationItem';

class Notification extends React.Component {
  componentDidMount() {
    this.props.notificationShowAction(this.props.match.params.id);

    if (this.props.match.params.coin) {
      document.title = this.props.match.params.coin + ' Notification Detail | Coinlen';
    } else {
      document.title = 'Notification Detail | Coinlen';
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.notificationShowAction(this.props.match.params.id);

      if (this.props.match.params.coin) {
        document.title = this.props.match.params.coin + ' Notification Detail | Coinlen';
      }
    }
  }

  render() {
    const { isNotificationShowLoading, datum } = this.props.notifications;
    const coin = datum && datum.coin && JSON.parse(datum.coin);
    const format = datum && datum.format && JSON.parse(datum.format);

    return (
      <Grid>
        <Row>
          <Col xs={12} mdOffset={3} md={6}>
            <h3>
              <Link to={'/notifications'} style={{ marginRight: 5 }}>
                <Icon icon={IconNames.ARROW_LEFT} />
              </Link>{' '}
              Notification Detail
            </h3>
            {isNotificationShowLoading && <Spinner />}
            {!isNotificationShowLoading && datum.length === 0 && <H5>There is no notification...</H5>}
            {!isNotificationShowLoading && coin && (
              <React.Fragment>
                <NotificationItem notification={datum} />
                <div className="table-responsive">
                  <table className={classnames(Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED)}>
                    <tbody>
                      <tr>
                        <td width="40%">Coin</td>
                        <td>{coin.N}</td>
                      </tr>
                      <tr>
                        <td>Coin</td>
                        <td>{coin.C}</td>
                      </tr>
                      <tr>
                        <td>Price USD</td>
                        <td>${numeral(coin.U).format(format.UF)}</td>
                      </tr>
                      <tr>
                        <td>Paribu Binance % Diff</td>
                        <td>{numeral(coin.PBd).format(format.PDf)}%</td>
                      </tr>
                      <tr>
                        <td>Paribu Buying</td>
                        <td>₺{numeral(coin.PThb).format(format.PTf)}</td>
                      </tr>
                      <tr>
                        <td>Binance TRY</td>
                        <td>₺{numeral(coin.T).format(format.TF)}</td>
                      </tr>
                      <tr>
                        <td>Paribu Selling</td>
                        <td>₺{numeral(coin.PTla).format(format.PMxf)}</td>
                      </tr>
                      <tr>
                        <td>Binance Paribu % DIFF</td>
                        <td>{numeral(coin.BPd).format('0.00')}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.object.isRequired,
  notificationShowAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, { notificationShowAction })(Notification);
