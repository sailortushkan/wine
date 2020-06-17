import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';

import './index.css'

const AdminPage = () => {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className='admin-container'>
            <h1>Admin</h1>
              <div>
                <strong>ID:</strong> {authUser.uid}
              </div>
              <div>
                <strong>E-Mail:</strong> {authUser.email}
              </div>
              <div>
                <strong>Username:</strong> {authUser.username}
              </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);