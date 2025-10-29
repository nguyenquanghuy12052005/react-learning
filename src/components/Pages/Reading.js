import React from "react";
import "./PageStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Reading = () => {
  return (
    <div className="page">
      <div className="container py-5">
        <div className="card shadow-lg p-5 border-0 rounded-4 bg-light">
          <h1 className="text-center text-success mb-4 fw-bold">
            📖 TOEIC Reading Practice
          </h1>

          <p className="lead text-muted text-center mb-5">
            Đây là phần luyện <strong>Đọc hiểu (Reading)</strong> trong bài thi TOEIC.
            Bạn sẽ luyện cách đọc nhanh và hiểu chính xác các loại văn bản công việc.
          </p>

          <div className="row justify-content-center text-start">
            <div className="col-md-8">
              <h3 className="text-secondary fw-semibold mb-3">📘 Cấu trúc phần Reading:</h3>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">🧩 <b>Part 5:</b> Hoàn thành câu (Incomplete Sentences)</li>
                <li className="list-group-item">📄 <b>Part 6:</b> Hoàn thành đoạn văn (Text Completion)</li>
                <li className="list-group-item">📚 <b>Part 7:</b> Đọc hiểu đoạn văn (Reading Comprehension)</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">📖 Kỹ năng cần rèn:</h3>
              <ul className="mb-4">
                <li>✅ Đọc nhanh để nắm ý chính.</li>
                <li>✅ Nhận biết loại văn bản: email, quảng cáo, thông báo, bài báo...</li>
                <li>✅ Sử dụng ngữ pháp và từ vựng đúng ngữ cảnh.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">🧩 Bài luyện mẫu:</h3>
              <ul className="mb-5">
                <li>✏️ Điền từ đúng vào chỗ trống trong câu hoặc đoạn văn.</li>
                <li>📄 Trả lời câu hỏi dựa trên đoạn văn cho sẵn.</li>
                <li>🔍 Phân tích ngữ pháp và cấu trúc câu trong đoạn đọc.</li>
              </ul>

              <div className="text-center">
                <button
                  className="btn btn-success btn-lg px-4 rounded-pill shadow-sm"
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

export default Reading;
