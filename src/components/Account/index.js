import React, { Component } from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

import './index.css';

class AccountPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      userInfo: {},
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
 
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
      this.setState({
        userInfo: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }
 
  render() {
    const { userInfo, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='account-container'>
            <h1>Account: {userInfo.username}</h1>
            <div>E-mail: {userInfo.email}</div>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
        )}        
      </AuthUserContext.Consumer>      
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);