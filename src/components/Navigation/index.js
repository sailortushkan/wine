import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Logo from '../Logo';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import './index.css';

const Navigation = () => (
  <header className='header'>
    <Logo />
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </header>
);

const NavigationAuth = () => (
  <nav className='nav-container nav-container-auth'>
    <Link to={ROUTES.HOME} className='nav-link'>Home</Link>
    <Link to={ROUTES.ACCOUNT} className='nav-link'>Account</Link>
    <Link to={ROUTES.ADMIN} className='nav-link'>Admin</Link>
    <SignOutButton />
  </nav>
);

const NavigationNonAuth = () => (
  <nav className='nav-container nav-container-nonauth'>
    <Link to={ROUTES.SIGN_IN} className='nav-link'>Sign In</Link>    
  </nav>
);

export default Navigation;