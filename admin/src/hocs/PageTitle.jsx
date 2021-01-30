import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  //theme
  title: {
    paddingLeft: 2,
    paddingRight: 2,
  },
}));

const PageTitle = (props) => {
  const classes = useStyles();

  if (props.h) {
    return <h3 className={classes.title}>{props.children}</h3>;
  }

  return <h2 className={classes.title}>{props.children}</h2>;
};

PageTitle.propTypes = {
  h: PropTypes.any,
  children: PropTypes.any,
};

export default PageTitle;
