import React, { useState, useMemo, useEffect } from 'react';
import VocabCard from './VocabCard';
import VocabModal from './VocabModal';
import vocabData from '../../data/toeic_vocab.json';
import './Vocab.scss';

const ITEMS_PER_PAGE = 12;

const VocabPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeStr = (str) => {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

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

  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWords = filteredWords.slice(startIndex, endIndex);

  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="vocab-page-custom">
      <div className="vocab-container">
        <h1 className="page-title">TOEIC Vocabulary</h1>

        {/* --- Phần Tìm Kiếm Tự Code (Không Bootstrap) --- */}
        <div className="search-wrapper">
          <div className="search-box-custom">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>
        </div>

        {searchTerm && (
          <div className="search-result-count">
            Tìm thấy <strong>{filteredWords.length}</strong> kết quả
          </div>
        )}

        {/* --- Phần Grid Từ Vựng --- */}
        {currentWords.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem' }}>
            <p>Không tìm thấy từ vựng nào.</p>
          </div>
        ) : (
          <div className="vocab-grid-custom">
            {currentWords.map((word, i) => (
              <VocabCard
                key={startIndex + i}
                word={word}
                onClick={setSelectedWord}
              />
            ))}
          </div>
        )}

        {/* --- Phần Phân Trang --- */}
        {filteredWords.length > 0 && totalPages > 1 && (
          <div className="pagination-custom">
            <button
              className="page-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-info">Trang {currentPage} / {totalPages}</span>
            <button
              className="page-btn"
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