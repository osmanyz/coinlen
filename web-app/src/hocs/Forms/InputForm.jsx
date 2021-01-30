import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Intent, FormGroup } from '@blueprintjs/core';
import { Field } from 'formik';
import { InputGroup } from 'formik-blueprint';

export const InputForm = (props) => (
  <FormGroup
    label={props.label}
    key={props.name}
    labelFor="text-input"
    labelInfo={props.labelInfo}
    helperText={props.helperText}
  >
    <Field
      id={props.name}
      name={props.name}
      type={props.type}
      label={props.label}
      placeholder={props.label}
      component={InputGroup}
      intent={props.touched[props.name] && props.errors[props.name] && Intent.DANGER}
    />
    {props.touched[props.name] && props.errors[props.name] && (
      <div className={Classes.FORM_HELPER_TEXT}>{props.errors[props.name]}</div>
    )}
  </FormGroup>
);

InputForm.propTypes = {
  required: PropTypes.bool,
  touched: PropTypes.any,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  labelInfo: PropTypes.any,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
