import React from "react";
import "./PageStyle.scss";

const Speaking = () => {
  return (
    <div className="page">
      <h1>TOEIC Speaking Practice</h1>
      <p>
        Đây là phần luyện **Nói (Speaking)** trong bài thi TOEIC. Phần này giúp bạn
        rèn luyện khả năng phát âm, phản xạ và trình bày ý kiến bằng tiếng Anh.
      </p>

      <h3>📘 Cấu trúc phần Speaking:</h3>
      <ul>
        <li><b>Task 1-2:</b> Đọc to đoạn văn.</li>
        <li><b>Task 3-4:</b> Mô tả hình ảnh.</li>
        <li><b>Task 5-7:</b> Trả lời câu hỏi.</li>
        <li><b>Task 8-10:</b> Trình bày quan điểm cá nhân.</li>
      </ul>

      <h3>🎯 Kỹ năng cần rèn:</h3>
      <p>
        - Phát âm chuẩn, ngữ điệu tự nhiên.<br />
        - Biết tổ chức ý khi nói và dùng từ nối hợp lý.<br />
        - Giữ tốc độ và sự tự tin khi trả lời.
      </p>

      <h3>🎤 Bài luyện mẫu:</h3>
      <ul>
        <li>Đọc một đoạn giới thiệu công ty bằng tiếng Anh.</li>
        <li>Mô tả bức ảnh về cuộc họp hoặc lớp học.</li>
        <li>Trả lời câu hỏi “Bạn thích làm việc nhóm hay độc lập hơn?”.</li>
      </ul>

      <button onClick={() => window.history.back()}>← Quay lại</button>
    </div>
  );
};

export default Speaking;
