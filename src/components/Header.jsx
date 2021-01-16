import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <ul>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact'>Contact</Link>
    </ul>
  </header>
);

export default Header;
