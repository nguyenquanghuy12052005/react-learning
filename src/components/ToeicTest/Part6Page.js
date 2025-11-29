
import React from 'react';
import { FaArrowLeft, FaClock, FaListUl, FaCrown } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import './Part6Page.scss'; // Style riêng cho trang này

const Part6Page = () => {
  // Tạo dữ liệu giả lập 12 bài Incomplete Sentences
  const lessons = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    return {
      id: id,
      // Tên bài: "Incomplete Sentences 01", "02"...
      name: `Text Completion  ${String(id).padStart(2, '0')}`,
      // Các bài từ 4 trở đi là bài Premium (có vương miện)
      isPro: id >= 4, 
      format: "2025 Format",
      status: "Chưa làm"
    };
  });

  return (
    <div className="part5-page">
      {/* Header Xanh Lá */}
      <div className="part5-header">
        <div className="header-content">
          <Link to="/toeic-prep" className="back-btn">
            <FaArrowLeft />
          </Link>
          <h1 className="header-title">Part 6</h1>
        </div>
      </div>

      {/* Grid Danh Sách Bài Học */}
      <div className="part5-container">
        <div className="part5-grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="card-top">
                <h3 className="lesson-name">
                  {lesson.name}
                  {lesson.isPro && <FaCrown className="icon-crown" title="Premium" />}
                </h3>
                <FaClock className="icon-history" />
              </div>
              
              <div className="card-bottom">
                <span className="tag-format">{lesson.format}</span>
                <div className="status">
                  <FaListUl className="icon-list" />
                  <span>{lesson.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Part6Page;