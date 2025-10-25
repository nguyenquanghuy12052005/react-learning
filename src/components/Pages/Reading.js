import React from "react";
import "./PageStyle.scss";

const Reading = () => {
  return (
    <div className="page">
      <h1>TOEIC Reading Practice</h1>
      <p>
        Đây là phần luyện **Đọc hiểu (Reading)** trong bài thi TOEIC.
        Bạn sẽ luyện cách đọc nhanh và hiểu chính xác các loại văn bản công việc.
      </p>

      <h3>📘 Cấu trúc phần Reading:</h3>
      <ul>
        <li><b>Part 5:</b> Hoàn thành câu (Incomplete Sentences)</li>
        <li><b>Part 6:</b> Hoàn thành đoạn văn (Text Completion)</li>
        <li><b>Part 7:</b> Đọc hiểu đoạn văn (Reading Comprehension)</li>
      </ul>

      <h3>📖 Kỹ năng cần rèn:</h3>
      <p>
        - Đọc nhanh để nắm ý chính.<br />
        - Nhận biết loại văn bản: email, quảng cáo, thông báo, bài báo...<br />
        - Sử dụng ngữ pháp và từ vựng đúng ngữ cảnh.
      </p>

      <h3>🧩 Bài luyện mẫu:</h3>
      <ul>
        <li>Điền từ đúng vào chỗ trống trong câu hoặc đoạn văn.</li>
        <li>Trả lời câu hỏi dựa trên đoạn văn cho sẵn.</li>
        <li>Phân tích ngữ pháp và cấu trúc câu trong đoạn đọc.</li>
      </ul>

      <button onClick={() => window.history.back()}>← Quay lại</button>
    </div>
  );
};

export default Reading;
