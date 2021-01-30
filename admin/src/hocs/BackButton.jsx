import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = (props) => (
  <IconButton color="primary" aria-label="upload picture" component={Link} to={props.to}>
    <ArrowBackIcon />
  </IconButton>
);

BackButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default BackButton;
