import React from "react";
import "./PageStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Writting = () => {
  return (
    <div className="page">
      <div className="container py-5">
        <div className="card shadow-lg p-5 border-0 rounded-4 bg-light">
          <h1 className="text-center text-danger mb-4 fw-bold">
            ✍️ TOEIC Writing Practice
          </h1>

          <p className="lead text-muted text-center mb-5">
            Đây là phần luyện <strong>Viết (Writing)</strong> trong bài thi TOEIC. 
            Phần này giúp bạn luyện kỹ năng viết câu, mô tả hình ảnh và viết bài luận ngắn.
          </p>

          <div className="row justify-content-center text-start">
            <div className="col-md-8">
              <h3 className="text-secondary fw-semibold mb-3">📘 Cấu trúc phần Writing:</h3>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">🖼️ <b>Task 1-5:</b> Viết câu mô tả hình ảnh.</li>
                <li className="list-group-item">📧 <b>Task 6-7:</b> Viết câu phản hồi email.</li>
                <li className="list-group-item">📝 <b>Task 8:</b> Viết đoạn văn thể hiện quan điểm cá nhân.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">✍️ Kỹ năng cần rèn:</h3>
              <ul className="mb-4">
                <li>✅ Viết đúng ngữ pháp và cấu trúc câu.</li>
                <li>✅ Dùng từ vựng trang trọng, phù hợp bối cảnh công sở.</li>
                <li>✅ Diễn đạt ý rõ ràng, mạch lạc, có kết nối giữa các câu.</li>
              </ul>

              <h3 className="text-secondary fw-semibold mb-3">📝 Bài luyện mẫu:</h3>
              <ul className="mb-5">
                <li>🖼️ Mô tả một bức ảnh trong 3 câu.</li>
                <li>📧 Viết phản hồi cho email khách hàng.</li>
                <li>💡 Trình bày ý kiến về “Làm việc tại nhà có lợi không?”.</li>
              </ul>

              <div className="text-center">
                <button
                  className="btn btn-danger btn-lg px-4 rounded-pill shadow-sm"
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

export default Writting;
