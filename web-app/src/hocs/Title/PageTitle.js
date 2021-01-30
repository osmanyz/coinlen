import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ children }) => (<h3 className={'page-title'}>{children}</h3>);

PageTitle.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PageTitle;
