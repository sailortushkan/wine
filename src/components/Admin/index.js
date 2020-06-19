import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import './index.css';

class AdminPage extends Component {
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
          <div className='admin-container'>
            <h1>Admin</h1>
            <div>{authUser.uid}</div>
            { loading && <div> Loading... </div> }
            <div>{userInfo.username}</div>
          </div>
        )}        
      </AuthUserContext.Consumer>      
    );
  }
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AdminPage);