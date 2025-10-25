import React from "react";
import "./PageStyle.scss";

const Writting = () => {
  return (
    <div className="page">
      <h1>TOEIC Writing Practice</h1>
      <p>
        Đây là phần luyện **Viết (Writing)** trong bài thi TOEIC. Phần này giúp bạn
        luyện kỹ năng viết câu, mô tả hình ảnh và viết bài luận ngắn.
      </p>

      <h3>📘 Cấu trúc phần Writing:</h3>
      <ul>
        <li><b>Task 1-5:</b> Viết câu mô tả hình ảnh.</li>
        <li><b>Task 6-7:</b> Viết câu phản hồi email.</li>
        <li><b>Task 8:</b> Viết đoạn văn thể hiện quan điểm cá nhân.</li>
      </ul>

      <h3>✍️ Kỹ năng cần rèn:</h3>
      <p>
        - Viết đúng ngữ pháp và cấu trúc câu. <br />
        - Biết dùng từ vựng trang trọng, phù hợp bối cảnh công sở. <br />
        - Diễn đạt ý rõ ràng, mạch lạc, có kết nối giữa các câu.
      </p>

      <h3>📝 Bài luyện mẫu:</h3>
      <ul>
        <li>Mô tả một bức ảnh trong 3 câu.</li>
        <li>Viết phản hồi cho email khách hàng.</li>
        <li>Trình bày ý kiến về “Làm việc tại nhà có lợi không?”.</li>
      </ul>

      <button onClick={() => window.history.back()}>← Quay lại</button>
    </div>
  );
};

export default Writting;
