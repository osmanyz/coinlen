import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import MyTheme from '../MyTheme';

export default function BaseLayout(props) {
  return (
    <ThemeProvider theme={MyTheme('light')}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.any,
};
