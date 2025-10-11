import VideoHomePage from "../../assets/video-homepage.mp4"
import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import './Home.scss';


const Home = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href'));
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <main className="home">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              Chào mừng đến với
              <span className="hero__title-highlight"> Website của chúng tôi</span>
            </h1>
            <p className="hero__description">
              Chúng tôi cung cấp các dịch vụ chất lượng cao với trải nghiệm tuyệt vời
            </p>
            <div className="hero__actions">
              <button className="hero__cta-btn">Khám phá ngay</button>
              <button className="hero__secondary-btn">Tìm hiểu thêm</button>
            </div>
          </div>
          <div className="hero__image">
            <img src="/logo192.png" alt="Hero illustration" className="hero__image-src" />
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-text">Cuộn xuống</div>
          <div className="hero__scroll-arrow">↓</div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="services__container">
          <div className="services__header">
            <h2 className="services__title">Dịch vụ của chúng tôi</h2>
            <p className="services__description">
              Chúng tôi cung cấp các giải pháp toàn diện cho nhu cầu của bạn
            </p>
          </div>
          <div className="services__grid">
            <div className="service-card">
              <div className="service-card__icon">
                <span className="service-card__icon-symbol">🚀</span>
              </div>
              <h3 className="service-card__title">Dịch vụ 1</h3>
              <p className="service-card__description">
                Mô tả ngắn gọn về dịch vụ đầu tiên mà chúng tôi cung cấp
              </p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <span className="service-card__icon-symbol">💡</span>
              </div>
              <h3 className="service-card__title">Dịch vụ 2</h3>
              <p className="service-card__description">
                Mô tả ngắn gọn về dịch vụ thứ hai mà chúng tôi cung cấp
              </p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <span className="service-card__icon-symbol">🎯</span>
              </div>
              <h3 className="service-card__title">Dịch vụ 3</h3>
              <p className="service-card__description">
                Mô tả ngắn gọn về dịch vụ thứ ba mà chúng tôi cung cấp
              </p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <span className="service-card__icon-symbol">⚡</span>
              </div>
              <h3 className="service-card__title">Dịch vụ 4</h3>
              <p className="service-card__description">
                Mô tả ngắn gọn về dịch vụ thứ tư mà chúng tôi cung cấp
              </p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about__container">
          <div className="about__content">
            <h2 className="about__title">Về chúng tôi</h2>
            <p className="about__description">
              Chúng tôi là một đội ngũ chuyên nghiệp với nhiều năm kinh nghiệm
              trong lĩnh vực cung cấp dịch vụ chất lượng cao.
            </p>
            <p className="about__description">
              Với sứ mệnh mang đến trải nghiệm tốt nhất cho khách hàng,
              chúng tôi luôn nỗ lực không ngừng để phát triển và cải thiện dịch vụ.
            </p>
          </div>
          <div className="about__image">
            <img src="/logo192.png" alt="About us" className="about__image-src" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact__container">
          <div className="contact__content">
            <h2 className="contact__title">Liên hệ với chúng tôi</h2>
            <p className="contact__description">
              Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
            </p>
            <div className="contact__info">
              <div className="contact__info-item">
                <span className="contact__info-icon">📞</span>
                <span className="contact__info-text">+84 123 456 789</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">📧</span>
                <span className="contact__info-text">info@example.com</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">📍</span>
                <span className="contact__info-text">123 Đường ABC, TP.HCM</span>
              </div>
            </div>
          </div>
          <div className="contact__form">
            <form className="contact-form">
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="name">Họ tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact-form__input"
                  required
                />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-form__input"
                  required
                />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="message">Tin nhắn</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="contact-form__textarea"
                  required
                ></textarea>
              </div>
              <button type="submit" className="contact-form__submit-btn">
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
