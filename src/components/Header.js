import React from 'react';
import { Link } from '@reach/router';

const Header = () => {
  return (
    <header className="header">
      <Link to="/"><h1>NC News</h1></Link>
    </header>
  );
};

export default Header;