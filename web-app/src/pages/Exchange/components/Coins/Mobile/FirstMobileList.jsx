import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'react-flexbox-grid';
import MobileSkeleton from './components/MobileSkeleton';

const FirstMobileList = (props) => (
  <React.Fragment>
    {(props.isCoinsLoading || props.isFormatLoading) && <MobileSkeleton />}
    {!props.isCoinsLoading &&
      !props.isFormatLoading &&
      props.coins &&
      props.coins
        .filter((c) => c.I === 0 || c.I === 1)
        .map((coin) => (
          <Row
            key={coin.C}
            onClick={() => props.show(coin.C)}
            className={classnames(
              'mobile-coin-card',
              coin.C === 'BTC' && 'first'
            )}
          >
            <Col xs={5} className="mobile-info">
              <div className="mobile-symbol">
                <img src={`./coins/sm/${coin.C}.svg`} alt={coin.N} width={32} height={32} />
              </div>
              <div className="mobile-coin">
                <h4 className="mobile-coin-price">
                  {'$' + (coin.U && numeral(coin.U).format(props.formats.get(coin.C).UF))}
                </h4>
                <h4 className="mobile-coin-name">{props.formats.get(coin.C).N}</h4>
                <span className="mobile-coin-24-growth-rate">
                  24H%: {numeral(coin.G24H).format(props.formats.get(coin.C).G24Hf)}%
                </span>
              </div>
            </Col>
            <Col xs={3} className="mobile-statistics">
              <span>
                %P:
                {coin.PBd !== 0 && Math.sign(coin.PBd) === 1 && '+'}
                {coin.PBd && numeral(coin.PBd).format(props.formats.get(coin.C).PBdf)}%
              </span>
              <br />
              <span>
                %B:
                {coin.BPd !== 0 && Math.sign(coin.BPd) === 1 && '+'}
                {coin.BPd && numeral(coin.BPd).format(props.formats.get(coin.C).BPdf)}%
              </span>
            </Col>
            <Col xs={4} className="mobile-actions">
              <span title="Turkish Lira">₺{coin.T && numeral(coin.T).format(props.formats.get(coin.C).TF)}</span>
              <br />
              <span title="Buying">B: ₺{coin.PThb && numeral(coin.PThb).format(props.formats.get(coin.C).PThbf)}</span>
              <br />
              <span title="Selling">S: ₺{coin.PTla && numeral(coin.PTla).format(props.formats.get(coin.C).PTlaf)}</span>
            </Col>
          </Row>
        ))}
  </React.Fragment>
);

FirstMobileList.propTypes = {
  coins: PropTypes.array.isRequired,
  formats: PropTypes.object.isRequired,
  isCoinsLoading: PropTypes.bool.isRequired,
  isFormatLoading: PropTypes.bool.isRequired,
  _checkPreviousPrice: PropTypes.func.isRequired,
  _opportunityBg: PropTypes.func.isRequired,
  _opportunityTextMobile: PropTypes.func.isRequired,
};

export default FirstMobileList;
