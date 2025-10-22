import VideoBG from "../../assets/videobg.mp4"; // Import video của bạn
import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import './Home.scss';

// Import thư viện AOS
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS cần thiết cho AOS

const Home = () => {
  useEffect(() => {
    // 1. Khởi tạo AOS với cấu hình mới
    AOS.init({
      duration: 1500, // Tăng thời gian animation lên 1500ms (1.5s) để chậm hơn
      once: false,     // THAY ĐỔI: Đặt thành 'false' để chạy animation MỖI LẦN scroll qua
      easing: 'ease-in-out', // Hiệu ứng chuyển động
    });

    // Hàm xử lý cuộn mượt (giữ nguyên)
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
        <video autoPlay loop muted className="hero__video-bg">
          <source src={VideoBG} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
        <div className="hero__overlay"></div>
        <div className="hero__container">
          {/* Tăng duration lên 2000ms cho phần chính */}
          <div className="hero__content" data-aos="fade-up" data-aos-duration="2000"> 
            <h1 className="hero__title">
              Chào mừng đến với
              <span className="hero__title-highlight"> Website Toeic của chúng tôi</span>
            </h1>
            <p className="hero__description">
              Chúng tôi cung cấp các dịch vụ chất lượng cao với trải nghiệm tuyệt vời
            </p>
            <div className="hero__actions">
              <button className="hero__cta-btn">Khám phá ngay</button>
              <button className="hero__secondary-btn">Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-text">Cuộn xuống</div>
          <div className="hero__scroll-arrow">↓</div>
        </div>
      </section>

      {/* Services Section - Có Animation cho từng thành phần */}
      <section id="services" className="services">
        <div className="services__container">
          {/* Animation Header: Fade Right, chậm 1.5s */}
          <div className="services__header" data-aos="fade-right" data-aos-duration="1500"> 
            <h2 className="services__title">Dịch vụ của chúng tôi</h2>
            <p className="services__description">
              Chúng tôi cung cấp các giải pháp toàn diện cho nhu cầu của bạn
            </p>
          </div>
          <div className="services__grid">
            {/* Thẻ Dịch vụ 1: Fade Up, chậm 1.5s, delay 300ms */}
            <div className="service-card" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
              <div className="service-card__icon"><span className="service-card__icon-symbol">🚀</span></div>
              <h3 className="service-card__title">Dịch vụ 1</h3>
              <p className="service-card__description">Mô tả ngắn gọn về dịch vụ đầu tiên</p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            {/* Thẻ Dịch vụ 2: Fade Up, chậm 1.5s, delay 600ms */}
            <div className="service-card" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
              <div className="service-card__icon"><span className="service-card__icon-symbol">💡</span></div>
              <h3 className="service-card__title">Dịch vụ 2</h3>
              <p className="service-card__description">Mô tả ngắn gọn về dịch vụ thứ hai</p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            {/* Thẻ Dịch vụ 3: Fade Up, chậm 1.5s, delay 900ms */}
            <div className="service-card" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="900">
              <div className="service-card__icon"><span className="service-card__icon-symbol">🎯</span></div>
              <h3 className="service-card__title">Dịch vụ 3</h3>
              <p className="service-card__description">Mô tả ngắn gọn về dịch vụ thứ ba</p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
            {/* Thẻ Dịch vụ 4: Fade Up, chậm 1.5s, delay 1200ms */}
            <div className="service-card" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="1200">
              <div className="service-card__icon"><span className="service-card__icon-symbol">⚡</span></div>
              <h3 className="service-card__title">Dịch vụ 4</h3>
              <p className="service-card__description">Mô tả ngắn gọn về dịch vụ thứ tư</p>
              <a href="#" className="service-card__link">Xem chi tiết →</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about__container">
          {/* Animation Content: Fade Right, chậm 1.5s */}
          <div className="about__content" data-aos="fade-right" data-aos-duration="1500"> 
            <h2 className="about__title">Về chúng tôi</h2>
            <p className="about__description">
              Chúng tôi là một đội ngũ chuyên nghiệp với nhiều năm kinh nghiệm
            </p>
            <p className="about__description">
              Với sứ mệnh mang đến trải nghiệm tốt nhất, chúng tôi luôn nỗ lực.
            </p>
          </div>
          {/* Animation Image: Fade Left, chậm 1.5s, delay 500ms */}
          <div className="about__image" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500"> 
            <img src="/logo192.png" alt="About us" className="about__image-src" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact__container">
          {/* Animation Content: Fade Up, chậm 1.5s */}
          <div className="contact__content" data-aos="fade-up" data-aos-duration="1500"> 
            <h2 className="contact__title">Liên hệ với chúng tôi</h2>
            <p className="contact__description">
              Hãy liên hệ để được tư vấn và hỗ trợ tốt nhất
            </p>
            <div className="contact__info">
              {/* Thêm delay cho từng mục thông tin */}
              <div className="contact__info-item" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
                <span className="contact__info-icon">📞</span>
                <span className="contact__info-text">+84 123 456 789</span>
              </div>
              <div className="contact__info-item" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <span className="contact__info-icon">📧</span>
                <span className="contact__info-text">info@example.com</span>
              </div>
              <div className="contact__info-item" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="900">
                <span className="contact__info-icon">📍</span>
                <span className="contact__info-text">123 Đường ABC, TP.HCM</span>
              </div>
            </div>
          </div>
          {/* Animation Form: Fade Left, chậm 1.5s, delay 500ms */}
          <div className="contact__form" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500"> 
            <form className="contact-form">
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="name">Họ tên</label>
                <input type="text" id="name" name="name" className="contact-form__input" required />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="contact-form__input" required />
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label" htmlFor="message">Tin nhắn</label>
                <textarea id="message" name="message" rows="5" className="contact-form__textarea" required></textarea>
              </div>
              <button type="submit" className="contact-form__submit-btn">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Home;