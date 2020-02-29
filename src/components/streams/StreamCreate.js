import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

export class StreamCreate extends Component {
  onFormSubmit = formData => {
    this.props.createStream(formData);
  };

  render() {
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onFormSubmit} buttonTitle="Create New Stream" />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
