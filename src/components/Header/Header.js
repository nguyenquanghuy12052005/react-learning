import React, { useState } from 'react';
import './Header.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          {/* Logo placeholder */}
          <img src="/logo-placeholder.png" alt="Logo" />
        </div>

        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            </li>
            <li className="menu-item">
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </li>
            <li className="menu-item">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            <li className="menu-item">
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </div>

        <div className="icons">
          {/* Icons placeholders */}
          <div className="icon search-icon">
            {/* Search icon placeholder */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <div className="icon cart-icon">
            {/* Cart icon placeholder */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4V2c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v2l4 0c.55 0 1 .45 1 1s-.45 1-1 1l-1 12c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1L3 6c-.55 0-1-.45-1-1s.45-1 1-1l4 0zM9 2v2h6V2H9z"/>
            </svg>
          </div>
        </div>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
