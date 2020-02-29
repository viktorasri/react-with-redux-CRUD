import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

export class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminMenu(stream) {
    if (stream.userId === this.props.currentUserID) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      const { id, title, description } = stream;
      return (
        <div className="item" key={id}>
          {this.renderAdminMenu(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${id}`}>{title}</Link>
            <div className="description">{description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streams: Object.values(state.streams),
  currentUserID: state.auth.userId,
  isSignedIn: state.auth.isSignedIn
});

const mapDispatchToProps = {
  fetchStreams
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
