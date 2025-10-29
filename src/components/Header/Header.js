import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo5.png';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="Logo" />
          </Link>
          <span className="header__logo-text">THS English</span>
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/" className="header__nav-link">Trang chủ</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/vocab" className="header__nav-link">Từ vựng</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/services" className="header__nav-link">Dịch vụ</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact" className="header__nav-link">Liên hệ</Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <Link to="/login" className="header__login-btn">ĐĂNG NHẬP</Link>
        </div>

        <button
          className={`header__mobile-toggle ${isMenuOpen ? 'header__mobile-toggle--open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
