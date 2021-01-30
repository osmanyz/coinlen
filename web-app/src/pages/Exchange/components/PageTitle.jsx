import React from 'react';
import numeral from 'numeral';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Classes } from '@blueprintjs/core';

const PageTitle = (props) => (
  <h3 className="page-title">
    {props.title}
    {!props.currency && <span className={classnames(Classes.SKELETON, 'page-title-skeleton')} tabIndex="-1" />}
    {props.currency && (
      <span className={classnames(Classes.TEXT_MUTED, 'page-title-currency')} title={`1 USD = ${props.currency} TRY`}>
        (1 USD = {numeral(props.currency).format('0.000')} TRY)
      </span>
    )}
    {props.time && (
      <span className={classnames(Classes.TEXT_MUTED, 'page-title-time')}>
        Market Time: <Moment date={props.time} format="HH:mm:ss" />
      </span>
    )}
  </h3>
);

PageTitle.propTypes = {
  title: PropTypes.string,
  currency: PropTypes.number,
  time: PropTypes.number,
};

export default PageTitle;
