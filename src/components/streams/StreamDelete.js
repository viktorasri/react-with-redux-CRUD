import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

export class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDeleteClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderActions = () => {
    return (
      <React.Fragment>
        <div onClick={this.onDeleteClick} className="ui negative button">
          Delete
        </div>
        <Link to="/" className="ui cancel button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  renderContent() {
    const { stream } = this.props;
    return `Are you sure you want to delete stream: ${stream ? stream.title : ''}`;
  }

  render() {
    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = { fetchStream, deleteStream };

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
