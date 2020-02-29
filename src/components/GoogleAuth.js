import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '283226778357-5k9c3jn1j1hdq1aamtvokj5qlb4di6td.apps.googleusercontent.com',
          scope: 'profile'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onClickSignIn = () => {
    this.auth.signIn();
  };

  onClickSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return (
        <div className="ui red google button">
          <i className="google icon"></i>
          Loading...
        </div>
      );
    }
    if (isSignedIn) {
      return (
        <button onClick={this.onClickSignOut} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onClickSignIn} className="ui red google button">
          <i className="google icon"></i>
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

const mapDispatchToProps = {
  signIn,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
