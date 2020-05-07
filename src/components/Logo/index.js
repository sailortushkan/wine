import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import './index.css';

const Logo = () => (
  <Link to={ROUTES.LANDING} className='logo'>Wine Up</Link>
);

export default Logo;