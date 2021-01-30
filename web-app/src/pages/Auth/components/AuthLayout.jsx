import React from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation, H4 } from '@blueprintjs/core';

export default function AuthLayout(props) {
  if (localStorage.getItem('darkMode') === 'dark') {
    document.body.classList.add('bp3-dark');
    document.body.classList.remove('bp3-body');
  } else {
    document.body.classList.add('bp3-body');
    document.body.classList.remove('bp3-dark');
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ marginBottom: 20 }}>
          <H4>{props.title}</H4>
        </div>
        <Card elevation={Elevation.TWO}>
          {props.children}
        </Card>
        <div style={{ textAlign: 'center', marginTop: 25 }}>
          <h2>coinlen.com</h2>
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
