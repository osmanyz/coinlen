import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import AlertSnackbar from '../../../components/Alert/AlertSnackbar';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Required!'),
  phone: Yup.string().required('Required!'),
  email: Yup.string().email('Invalid email address').required('Required!'),
  role: Yup.string().required('Required!'),
  premiumDate: Yup.date().required('Required!'),
});

const Forms = (props) => {
  // if (props.type === 'create' && !values.password) {
  //    errors.password = 'Required!';
  //  }

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
                  name="name"
                  id="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Fullname"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="phone"
                  id="phone"
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="5301231010"
                  label="Phone"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="email"
                  id="email"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="password"
                  id="password"
                  type="password"
                  variant="outlined"
                  required={props.type === 'create' ? true : false}
                  fullWidth
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field
                    component={DateTimePicker}
                    id="premiumDate"
                    name="premiumDate"
                    label="Premium Date"
                    format="dd/MM/yyyy HH:mm"
                    inputVariant="outlined"
                    variant="outlined"
                    required={true}
                    ampm={false}
                    autoOk
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required={true}>
                  <InputLabel htmlFor="premiumStatus">Premium Status</InputLabel>
                  <Field
                    component={Select}
                    label={'premiumStatus'}
                    name="premiumStatus"
                    inputProps={{
                      id: 'premiumStatus',
                    }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Passive</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required={true}>
                  <InputLabel htmlFor="Premium">Premium</InputLabel>
                  <Field
                    component={Select}
                    label={'Premium'}
                    name="premium"
                    inputProps={{
                      id: 'premium',
                    }}
                  >
                    <MenuItem value={'trial'}>Trial</MenuItem>
                    <MenuItem value={'economic'}>Economic</MenuItem>
                    <MenuItem value={'premium'}>Premium</MenuItem>
                    <MenuItem value={'business'}>Business</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required={true}>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Field
                    component={Select}
                    label={'Role'}
                    name="role"
                    inputProps={{
                      id: 'role',
                    }}
                  >
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" required={true}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Field
                    component={Select}
                    label={'status'}
                    name="status"
                    inputProps={{
                      id: 'status',
                    }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Passive</MenuItem>
                  </Field>
                </FormControl>
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
  type: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Forms;
