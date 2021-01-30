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
                  name="I"
                  id="I"
                  type="number"
                  variant="outlined"
                  required
                  fullWidth
                  label="Type"
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
                  label="Coin Name (Must be unique!)"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="UF"
                  id="UF"
                  variant="outlined"
                  required
                  fullWidth
                  label="Price (USD) Format (0,0.[000000])"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="G24Hf"
                  id="G24Hf"
                  variant="outlined"
                  required
                  fullWidth
                  label="24h% Format (0.0)"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="TF"
                  id="TF"
                  variant="outlined"
                  required
                  fullWidth
                  label="TRY Format (0,0.[000000])"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="BPdf"
                  id="BPdf"
                  variant="outlined"
                  required
                  fullWidth
                  label="Binance to Paribu % Diff. Format (0.0)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="PBdf"
                  id="PBdf"
                  variant="outlined"
                  required
                  fullWidth
                  label="Paribu to Binance % Diff. Format (0.0)"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="PThbf"
                  id="PThbf"
                  variant="outlined"
                  required
                  fullWidth
                  label="Paribu Buying (SELL) Format (0,0.[000000])"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="PTlaf"
                  id="PTlaf"
                  variant="outlined"
                  required
                  fullWidth
                  label="Paribu Selling (BUY) Format (0,0.[000000])"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="BBdf"
                  id="BBdf"
                  variant="outlined"
                  required
                  fullWidth
                  label="BtcTurk to Binance % Diff. Format (0.0)"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="BBTdf"
                  id="BBTdf"
                  variant="outlined"
                  required
                  fullWidth
                  label="Binance % BtcTurk Diff. Format (0.0)"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="BThbf"
                  id="BThbf"
                  variant="outlined"
                  required
                  fullWidth
                  label="BtcTurk Buying (SELL) Format (0,0.[000000])"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="BTlaf"
                  id="BTlaf"
                  variant="outlined"
                  required
                  fullWidth
                  label="BtcTurk Selling (BUY) Format (0,0.[000000])"
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
              KAYDET
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
