// src/components/User/HomePage.js
import React from "react";
import SideBar from "./SideBar";
import "./HomePage.scss";

// ✅ Thêm lại 2 phần này ngay đầu file
const courses = [
  {
    id: 1,
    title: "Khoá học Giao tiếp A1",
    desc: "Bắt đầu với chào hỏi, giới thiệu bản thân, học từ vựng cơ bản để nói tự tin hơn.",
  },
  {
    id: 2,
    title: "Khoá học Giao tiếp A2",
    desc: "Mở rộng từ vựng, trò chuyện hàng ngày, luyện nói tự nhiên và lưu loát.",
  },
  {
    id: 3,
    title: "Khoá học Giao tiếp B1",
    desc: "Thảo luận ý kiến, bày tỏ quan điểm, giao tiếp rõ ràng và tự tin trong nhiều tình huống.",
  },
  {
    id: 4,
    title: "Khoá học Giao tiếp B2",
    desc: "Nói chuyện tự nhiên, tranh luận thuyết phục, thuyết trình với từ ngữ đa dạng.",
  },
  {
    id: 5,
    title: "Khoá học Giao tiếp Tiếng Anh Thương mại",
    desc: "Nói chuyện với đồng nghiệp, trò chuyện và chia sẻ về công việc.",
  },
];

// ✅ Định nghĩa component CourseCard
function CourseCard({ title, desc }) {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="select-btn">Chọn</button>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="homepage">
      <SideBar active="Trang chủ" />

      <main className="main-content">
        <h1>Chọn khoá học</h1>
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>
    </div>
  );
}
