import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

export class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onFormSubmit = formData => {
    this.props.onSubmit(formData);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onFormSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">{this.props.buttonTitle}</button>
      </form>
    );
  }
}

const validate = formData => {
  const errors = {};

  if (!formData.title) {
    errors.title = 'You must enter stream Title';
  }

  if (!formData.description) {
    errors.description = 'You must enter stream description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
