import React, { useState } from 'react';
import VocabCard from './VocabCard';
import VocabModal from './VocabModal';
import vocabData from '../../data/toeic_vocab.json';
import '../../components/Vocab/Vocab.scss';

const ITEMS_PER_PAGE = 10;

const VocabPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán dữ liệu cho trang hiện tại
  const totalPages = Math.ceil(vocabData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWords = vocabData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="vocab-page">
      <div className="container">
        <h1 className="text-center mb-5">TOEIC Vocabulary</h1>

        {/* Grid từ vựng */}
        <div className="vocab-grid">
          {currentWords.map((word, i) => (
            <VocabCard key={startIndex + i} word={word} onClick={setSelectedWord} />
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-5 gap-2">
          <button
            className="btn btn-outline-primary px-4"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="mx-3 fw-bold text-primary">
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

        {/* Hiển thị số lượng từ */}
        <p className="text-center text-muted mt-3">
          Hiển thị {startIndex + 1}–{Math.min(endIndex, vocabData.length)} trong tổng số{' '}
          {vocabData.length} từ
        </p>
      </div>

      <VocabModal word={selectedWord} onClose={() => setSelectedWord(null)} />
    </div>
  );
};

export default VocabPage;