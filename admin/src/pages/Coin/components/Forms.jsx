import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import AlertSnackbar from '../../../components/Alert/AlertSnackbar';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  PS: Yup.string().required('Required!'),
  N: Yup.string().required('Required!'),
  C: Yup.string().required('Required!'),
  I: Yup.string().required('Required!'),
});

const Forms = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={props.values}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            props.callback(values);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="PS"
                  id="PS"
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  label="Position"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="N"
                  id="N"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Coin name (Bitcoin) (Must be unique!)"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="C"
                  id="C"
                  variant="outlined"
                  required
                  fullWidth
                  label="Coin (BTC) (Must be unique!)"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="I"
                  id="I"
                  variant="outlined"
                  required
                  fullWidth
                  label="Type: 0"
                />
              </Grid>
            </Grid>
            <br />
            {isSubmitting && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ paddingTop: 15, paddingBottom: 15 }}
              onClick={submitForm}
            >
              SAVE
            </Button>
          </Form>
        )}
      </Formik>
      <AlertSnackbar
        message={props.snackbarMessage ? props.snackbarMessage : ''}
        type={props.snackbarType}
        open={props.openSnackbar}
        handleClose={props.handleClose}
        autoHideDuration={15000}
      />
    </React.Fragment>
  );
};

Forms.propTypes = {
  openSnackbar: PropTypes.bool,
  snackbarType: PropTypes.string,
  snackbarMessage: PropTypes.string,
  handleClose: PropTypes.func,
  values: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Forms;
