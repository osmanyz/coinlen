import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Classes } from '@blueprintjs/core';
import TableSkeleton from './components/TableSkeleton';

const SecondTableList = (props) => {
  return (
    <div className="table-responsive">
      <table
        className={classnames(Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED, Classes.INTERACTIVE, 'table-layut-fixed')}
      >
        {(props.isCoinsLoading || props.isFormatLoading) && <TableSkeleton />}
        {!props.isCoinsLoading && !props.isFormatLoading && (
          <React.Fragment>
            <thead>
              <tr>
                <th style={{ width: 50 }} scope="col" />
                <th style={{ width: 100 }} scope="col" title={'24 Hours % Change'}>
                  24h%
                </th>
                <th scope="col">Coin</th>
                <th scope="col">Price USD</th>
                <th scope="col" title={'Difference of BtcTurk (TRY) value relative to Price (TRY)%'}>
                  BT.% Diff
                </th>
                <th scope="col">BtcTurk Buying (SELL)</th>
                <th scope="col">Binance TRY</th>
                <th scope="col" title="The means of (BUY) you can buy by this price of coins">
                  BtcTurk Selling (BUY)
                </th>
                <th scope="col" title={'Difference of BtcTurk (TRY) value relative to Price (TRY)%'}>
                  B.% Diff
                </th>
              </tr>
            </thead>
            <tbody>
              {props.coins &&
                props.coins
                  .filter((c) => c.I === 0 || c.I === 2)
                  .map((coin) => (
                    <tr key={coin.C} onClick={() => props.show(coin.C)}>
                      <td style={{ width: 50 }}>
                        <img
                          src={`./coins/sm/${coin.C}.svg`}
                          alt={coin.N}
                          width={27}
                          height={27}
                          style={{ marginTop: -5, marginBottom: -5 }}
                        />
                      </td>
                      <td className={props._twentyFourHours(coin)}>
                        {coin.G24H !== 0 && Math.sign(coin.G24H) === 1 && '+'}
                        {numeral(coin.G24H).format(props.formats.get(coin.C).G24Hf)}%
                      </td>
                      <td title={coin.N}>
                        <span>{coin.C}</span>
                        <span className={Classes.TEXT_MUTED} style={{ marginLeft: 5 }}>
                          {props.formats.get(coin.C).N}
                        </span>
                      </td>
                      <td className={props._checkPreviousPrice({ coin })}>
                        ${coin.U && numeral(coin.U).format(props.formats.get(coin.C).UF)}
                      </td>
                      <td className={props._opportunityBg({ diff: coin.BBd })}>
                        {coin.BBd !== 0 && Math.sign(coin.BBd) === 1 && '+'}
                        {coin.BBd && numeral(coin.BBd).format(props.formats.get(coin.C).BBdf)}%
                      </td>
                      <td>₺{coin.BThb && numeral(coin.BThb).format(props.formats.get(coin.C).BThbf)}</td>
                      <td>₺{coin.T && numeral(coin.T).format(props.formats.get(coin.C).TF)}</td>
                      <td>₺{coin.BTla && numeral(coin.BTla).format(props.formats.get(coin.C).BTlaf)}</td>
                      <td className={props._opportunityBg({ diff: coin.BBTd })}>
                        {coin.BBTd !== 0 && Math.sign(coin.BBTd) === 1 && '+'}
                        {coin.BBTd && numeral(coin.BBTd).format(props.formats.get(coin.C).BBTdf)}%
                      </td>
                    </tr>
                  ))}
            </tbody>
          </React.Fragment>
        )}
      </table>
    </div>
  );
};

SecondTableList.propTypes = {
  show: PropTypes.func.isRequired,
  coins: PropTypes.array.isRequired,
  formats: PropTypes.object.isRequired,
  isCoinsLoading: PropTypes.bool.isRequired,
  isFormatLoading: PropTypes.bool.isRequired,
  _checkPreviousPrice: PropTypes.func.isRequired,
  _opportunityText: PropTypes.func.isRequired,
  _twentyFourHours: PropTypes.func.isRequired,
  _opportunityBg: PropTypes.func.isRequired,
  _bitcoinOpportunity: PropTypes.func.isRequired,
};

export default SecondTableList;
