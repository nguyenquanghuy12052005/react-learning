import React from "react";
import "./PageStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Listening = () => {
  return (
    <div className="page">
      <div className="container py-5">
        <div className="card shadow-lg p-5 border-0 rounded-4 bg-light">
          <h1 className="text-center text-primary mb-4 fw-bold">
            🎧 TOEIC Listening Practice
          </h1>

          <p className="lead text-muted text-center mb-5">
            Đây là phần luyện <strong>Nghe (Listening)</strong> trong bài thi TOEIC. 
            Phần này giúp bạn rèn luyện khả năng nghe hiểu hội thoại, thông báo, 
            và các đoạn nói ngắn.
          </p>

          <div className="row justify-content-center text-start">
            <div className="col-md-8">
              <h3 className="text-secondary fw-semibold mb-3">📘 Cấu trúc phần Listening:</h3>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">🎞 <b>Part 1:</b> Mô tả tranh (Photographs)</li>
                <li className="list-group-item">💬 <b>Part 2:</b> Hỏi – Đáp (Question – Response)</li>
                <li className="list-group-item">🗣 <b>Part 3:</b> Hội thoại ngắn (Short Conversations)</li>
                <li className="list-group-item">📢 <b>Part 4:</b> Bài nói ngắn (Short Talks)</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">🎯 Mục tiêu luyện tập:</h3>
              <ul className="mb-4">
                <li>✅ Làm quen với giọng Mỹ, Anh, Úc.</li>
                <li>✅ Nghe ý chính, chi tiết, và suy luận nội dung.</li>
                <li>✅ Nâng cao tốc độ phản xạ tiếng Anh thực tế.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">🎧 Bài luyện mẫu:</h3>
              <ul className="mb-5">
                <li>🎤 Nghe đoạn hội thoại về công việc và chọn đáp án đúng.</li>
                <li>🛫 Nghe thông báo trong sân bay và ghi lại thông tin chính.</li>
                <li>🏫 Nghe phần hướng dẫn trong lớp học hoặc công ty.</li>
              </ul>

              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm"
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

export default Listening;
