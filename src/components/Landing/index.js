import React from 'react';

import { SignUpLink } from '../SignUp';
import "./index.css"

const LandingPage = () => (
  <div className="landing-container">
    <p>Write your wine story on WineUpApp.</p>
    <SignUpLink />
  </div>
);
export default LandingPage;