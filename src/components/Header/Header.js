import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo5.png'; 
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll Y:', window.scrollY); // DEBUG
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Gọi ngay lần đầu
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div style={{ position: 'absolute', top: 10, right: 10, color: 'red' }}>
        {/* Scroll: {window.scrollY}px | State: {isScrolled ? 'YES' : 'NO'} */}
      </div>
      <div className="header__container">
        <div className="header__logo">
  <a href="/" className="header__logo-link">
            <img src={logo} alt="Logo" /> {/* 👈 dùng biến logo */}
          </a>
          <span className="header__logo-text">THS English</span>
</div>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item"><a href="#home" className="header__nav-link">Trang chủ</a></li>
            <li className="header__nav-item"><a href="#about" className="header__nav-link">Vẽ</a></li>
            <li className="header__nav-item"><a href="#services" className="header__nav-link">Dịch vụ</a></li>
            <li className="header__nav-item"><a href="#contact" className="header__nav-link">Liên hệ</a></li>
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