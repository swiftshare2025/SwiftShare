// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ children }) => {
  return (
    <header className="header container">
      <Link to="/" className="logo">
        <h2>SwiftShare</h2>
      </Link>
      <nav>
        <Link to="/landing">Landing</Link>
        {children}
      </nav>
    </header>
  );
};

export default Navbar;
