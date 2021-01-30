import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading(props) {
  if (props.type) {
    return (
      <Grid container spacing={0} align="center" justify="center" direction="column">
        <Grid item style={{ marginTop: 100 }}>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Backdrop open={true} style={{ backgroundColor: '#f8f9fe' }}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

Loading.propTypes = {
  type: PropTypes.any,
};

export default Loading;
