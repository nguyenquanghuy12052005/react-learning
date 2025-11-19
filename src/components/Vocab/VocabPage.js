import React, { useState, useMemo } from 'react';
import VocabCard from './VocabCard';
import VocabModal from './VocabModal';
import vocabData from '../../data/toeic_vocab.json';
import '../../components/Vocab/Vocab.scss';

const ITEMS_PER_PAGE = 10;

const VocabPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

  // Chuẩn hóa chuỗi để tìm kiếm không phân biệt dấu, hoa/thường
  const normalizeStr = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu tiếng Việt
  };

  // Lọc dữ liệu theo từ khóa
  const filteredWords = useMemo(() => {
    if (!searchTerm.trim()) return vocabData;

    const term = normalizeStr(searchTerm);

    return vocabData.filter((item) => {
      const wordMatch = normalizeStr(item.word).includes(term);

      const meaningViMatch = item.meanings.some((m) =>
        normalizeStr(m.meaning_vi || '').includes(term)
      );

      return wordMatch || meaningViMatch;
    });
  }, [searchTerm]);

  // Tính toán phân trang cho danh sách đã lọc
  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWords = filteredWords.slice(startIndex, endIndex);

  // Reset về trang 1 khi tìm kiếm thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="vocab-page">
      <div className="container">
        <h1 className="text-center mb-4">TOEIC Vocabulary</h1>

        {/* Ô tìm kiếm */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-muted mt-2 text-center">
                Tìm thấy <strong>{filteredWords.length}</strong> từ vựng khớp với "
                <em>{searchTerm}</em>"
              </p>
            )}
          </div>
        </div>

        {/* Grid từ vựng */}
        {currentWords.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted fs-4">Không tìm thấy từ vựng nào.</p>
          </div>
        ) : (
          <div className="vocab-grid">
            {currentWords.map((word, i) => (
              <VocabCard
                key={startIndex + i}
                word={word}
                onClick={setSelectedWord}
              />
            ))}
          </div>
        )}

        {/* Pagination - chỉ hiển thị khi có kết quả */}
        {filteredWords.length > 0 && totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-5 gap-3 flex-wrap">
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="fw-bold text-primary">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              className="btn btn-outline-primary px-4"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        
      </div>

      <VocabModal word={selectedWord} onClose={() => setSelectedWord(null)} />
    </div>
  );
};

export default VocabPage;