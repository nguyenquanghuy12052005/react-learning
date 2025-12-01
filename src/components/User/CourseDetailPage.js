import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import "./CourseDetailPage.scss";

export default function CourseDetailPage() {
  const navigate = useNavigate();

  // Dữ liệu bài học
  const lessons = [
    { id: 1, title: "Bài học cơ bản 1", description: "Đã học xong bài này" },
    { id: 2, title: "Bài học cơ bản 2", description: "Đã học xong bài này" },
    { id: 3, title: "Bài học cơ bản 3", description: "Đã học xong bài này" },
    { id: 4, title: "Bài học cơ bản 4", description: "Đã học xong bài này" },
    { id: 5, title: "Bài học cơ bản 5", description: "Đã học xong bài này" },
  ];

  const handleNext = (id) => {
    // Chuyển sang trang từ vựng, có thể truyền id nếu muốn
    navigate("/vocab-page");
  };

  return (
    <div className="course-detail-page">
      <SideBar active="Trang chủ" />

      <main className="course-main">
        <div className="course-header">
          <div className="avatar-block">
            <img
              src="https://i.pravatar.cc/150"
              className="teacher-avatar"
              alt="avatar"
            />
            <div>
              <h2>Bài học cơ bản</h2>
              <p>Nhấn nút bên dưới để sang từ vựng</p>
            </div>
          </div>
        </div>

        <div className="lesson-container">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="vocab-card">
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <button className="next-btn" onClick={() => handleNext(lesson.id)}>
                Bài học tiếp theo
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
