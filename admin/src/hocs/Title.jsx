import React from 'react';
import PropTypes from 'prop-types';
import BackButton from './BackButton';

const Title = (props) => (
  <h2>
    <BackButton to={props.to} />
    {props.children}
  </h2>
);

Title.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Title;
