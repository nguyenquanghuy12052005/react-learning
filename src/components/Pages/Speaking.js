import React from "react";
import "./PageStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Speaking = () => {
  return (
    <div className="page">
      <div className="container py-5">
        <div className="card shadow-lg p-5 border-0 rounded-4 bg-light">
          <h1 className="text-center text-info mb-4 fw-bold">
            🗣️ TOEIC Speaking Practice
          </h1>

          <p className="lead text-muted text-center mb-5">
            Đây là phần luyện <strong>Nói (Speaking)</strong> trong bài thi TOEIC. 
            Phần này giúp bạn rèn luyện khả năng phát âm, phản xạ và trình bày ý kiến bằng tiếng Anh.
          </p>

          <div className="row justify-content-center text-start">
            <div className="col-md-8">
              <h3 className="text-secondary fw-semibold mb-3">📘 Cấu trúc phần Speaking:</h3>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">📄 <b>Task 1-2:</b> Đọc to đoạn văn.</li>
                <li className="list-group-item">🖼️ <b>Task 3-4:</b> Mô tả hình ảnh.</li>
                <li className="list-group-item">🎤 <b>Task 5-7:</b> Trả lời câu hỏi.</li>
                <li className="list-group-item">💬 <b>Task 8-10:</b> Trình bày quan điểm cá nhân.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">🎯 Kỹ năng cần rèn:</h3>
              <ul className="mb-4">
                <li>✅ Phát âm chuẩn, ngữ điệu tự nhiên.</li>
                <li>✅ Biết tổ chức ý khi nói và dùng từ nối hợp lý.</li>
                <li>✅ Giữ tốc độ và sự tự tin khi trả lời.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">🎤 Bài luyện mẫu:</h3>
              <ul className="mb-5">
                <li>📚 Đọc một đoạn giới thiệu công ty bằng tiếng Anh.</li>
                <li>🖼️ Mô tả bức ảnh về cuộc họp hoặc lớp học.</li>
                <li>💭 Trả lời câu hỏi “Bạn thích làm việc nhóm hay độc lập hơn?”.</li>
              </ul>

              <div className="text-center">
                <button
                  className="btn btn-info btn-lg px-4 rounded-pill shadow-sm text-white"
                  onClick={() => window.history.back()}
                >
                  ← Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
