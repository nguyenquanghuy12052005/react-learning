import React from "react";
import "./PageStyle.scss";

const Listening = () => {
  return (
    <div className="page">
      <h1>TOEIC Listening Practice</h1>
      <p>
        Đây là phần luyện **Nghe (Listening)** trong bài thi TOEIC. Phần này giúp bạn
        rèn luyện khả năng nghe hiểu hội thoại, thông báo, và các đoạn nói ngắn.
      </p>

      <h3>📘 Cấu trúc phần Listening:</h3>
      <ul>
        <li><b>Part 1:</b> Mô tả tranh (Photographs)</li>
        <li><b>Part 2:</b> Hỏi – Đáp (Question – Response)</li>
        <li><b>Part 3:</b> Hội thoại ngắn (Short Conversations)</li>
        <li><b>Part 4:</b> Bài nói ngắn (Short Talks)</li>
      </ul>

      <h3>🎯 Mục tiêu luyện tập:</h3>
      <p>
        - Làm quen với giọng Mỹ, Anh, Úc. <br />
        - Nghe ý chính, chi tiết, và suy luận nội dung. <br />
        - Nâng cao tốc độ phản xạ tiếng Anh thực tế.
      </p>

      <h3>🎧 Bài luyện mẫu:</h3>
      <ul>
        <li>Nghe đoạn hội thoại về công việc và chọn đáp án đúng.</li>
        <li>Nghe thông báo trong sân bay và ghi lại thông tin chính.</li>
        <li>Nghe phần hướng dẫn trong lớp học hoặc công ty.</li>
      </ul>

      <button onClick={() => window.history.back()}>← Quay lại</button>
    </div>
  );
};

export default Listening;
