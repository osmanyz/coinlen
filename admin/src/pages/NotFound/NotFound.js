import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 100,
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
  backButton: {
    marginTop: 50,
  },
}));

const NotFound = (props) => {
  const classes = useStyles();

  if (!localStorage.getItem('userToken')) {
    props.history.push('/login');
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h3">Page not found!</Typography>
            <Button
              variant="outlined"
              className={classes.backButton}
              color="primary"
              component={RouterLink}
              to="/dashboard"
              size="large"
            >
              Go to Dashboard
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
