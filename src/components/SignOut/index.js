import React from 'react';

import { withFirebase } from '../Firebase';
import './index.css';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut} className='nav-button'>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);