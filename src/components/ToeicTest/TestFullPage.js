import React from 'react';
import { FaArrowLeft, FaClock, FaListUl, FaCrown } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import './TestFullPage.scss'; 

const TestFullPage = () => {
  const tests = [
    { id: 1, name: "L&R Test 01", isPro: false },
    { id: 2, name: "L&R Test 02", isPro: false },
    { id: 3, name: "L&R Test 03", isPro: false },
    { id: 4, name: "L&R Test 04", isPro: true }, 
    { id: 5, name: "L&R Test 05", isPro: true },
    { id: 6, name: "L&R Test 06", isPro: true },
    { id: 7, name: "L&R Test 07", isPro: true },
    { id: 8, name: "L&R Test 08", isPro: true },
    { id: 9, name: "L&R Test 09", isPro: true },
  ];

  return (
    <div className="test-full-page">
      {/* Header xanh lá */}
      <div className="test-header">
        <div className="header-content">
          <Link to="/toeic-prep" className="back-btn">
            <FaArrowLeft />
          </Link>
          <h1 className="header-title">Full Test</h1>
        </div>
      </div>

      {/* Danh sách đề thi */}
      <div className="test-container">
        <div className="test-grid">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <div className="card-top">
                <h3 className="test-name">
                  {test.name}
                  {test.isPro && <FaCrown className="icon-crown" title="Premium" />}
                </h3>
                <FaClock className="icon-history" />
              </div>
              
              <div className="card-bottom">
                <span className="tag-format">2025 Format</span>
                <div className="status">
                  <FaListUl className="icon-list" />
                  <span>Chưa làm</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestFullPage;