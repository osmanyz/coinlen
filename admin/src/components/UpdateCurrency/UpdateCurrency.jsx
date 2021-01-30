import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Select } from 'formik-material-ui';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { apiUpdateCurrency } from '../../api/currency';
import useWindowSize from '../../helpers/useWindowSize';

const useStyles = makeStyles(() => ({
  // (theme) => {....}
  form: {
    padding: 20,
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    float: 'right',
  },
  drawer: {
    width: useWindowSize().width < 768 ? '100%' : '420px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: useWindowSize().width < 768 ? '100%' : '420px',
  },
  alertBox: {
    margin: 20,
    marginBottom: 10,
  },
}));

export default function UpdateCurrency(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    error: false,
    success: false,
  });

  const update = (values) => {
    setState({
      success: false,
      error: false,
    });

    apiUpdateCurrency(values)
      .then(() => {
        setState({
          success: true,
        });
      })
      .catch(() => {
        setState({
          error: true,
        });
      });
  };

  React.useContext(() => {
    if (props.open === false) {
      setState({
        success: false,
        error: false,
      });
    }
  });

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={props.onClose}
    >
      <h3 className={classes.title}>
        <span>UPDATE CURRENCY</span>
        <IconButton
          className={classes.close}
          onClick={props.onClose}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <CloseIcon />
        </IconButton>
      </h3>
      <Divider />
      {state.success && (
        <Alert variant="filled" severity="success" className={classes.alertBox}>
          Currency is succesfully updated!
        </Alert>
      )}
      {state.error && (
        <Alert variant="filled" severity="error" className={classes.alertBox}>
          There is something went wrong!
        </Alert>
      )}
      <Formik
        initialValues={{
          currency: '',
          autoUpdate: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.currency) {
            errors.currency = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            update(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <FormControl fullWidth variant="outlined" required={true}>
              <InputLabel htmlFor="autoUpdate">Automatic Updating</InputLabel>
              <Field
                component={Select}
                label={'autoUpdate'}
                name="autoUpdate"
                inputProps={{
                  id: 'autoUpdate',
                }}
              >
                <MenuItem value={true}>Automatic</MenuItem>
                <MenuItem value={false}>Manuel</MenuItem>
              </Field>
            </FormControl>
            <br/>
            <br/>
            <Field
              component={TextField}
              name="currency"
              fullWidth
              type="text"
              label="USD Currency"
              variant="outlined"
            />

            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            <Button variant="contained" color="primary" disabled={isSubmitting} fullWidth onClick={submitForm}>
              Update Currency
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
}

UpdateCurrency.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
};
