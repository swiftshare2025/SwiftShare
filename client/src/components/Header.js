import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-title" onClick={() => navigate('/')}>
      SWIFTSHARE
    </div>
  );
};

export default Header;
