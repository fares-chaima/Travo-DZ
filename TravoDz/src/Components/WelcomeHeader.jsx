import React from 'react';
import { Link } from 'react-router-dom';
import d from '../assets/d.png';

const WelcomeHeader = () => {
  return (
    <header className="welcome-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={d} alt="شعار كلشي ساهل" className="signup-logo" />
            <span className="logo-primary">كلشي</span>
            <span className="logo-dz">ساهل</span>
          </Link>
          
          <nav className="header-nav">
            <Link to="/login" className="nav-link">تسجيل الدخول</Link>
            <Link to="/register" className="nav-button">تسجيل</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;