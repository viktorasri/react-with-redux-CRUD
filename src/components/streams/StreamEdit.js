import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

export class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onFormSubmit = formData => {
    this.props.editStream(this.props.match.params.id, formData);
  };

  render() {
    if (!this.props.stream) {
      return '...Loading';
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onFormSubmit}
          buttonTitle="Save Changes"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = { fetchStream, editStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
