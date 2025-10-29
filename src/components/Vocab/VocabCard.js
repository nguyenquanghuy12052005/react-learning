import React from 'react';

const VocabCard = ({ word, onClick }) => {
  const { word: term, phonetic } = word;
  const usPhonetic = phonetic.us.replace(/[\/]/g, '');

  return (
    <div
      onClick={() => onClick(word)}
      className="bg-white rounded-3xl shadow-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
      style={{ minHeight: '180px' }}
    >
      <div className="mx-auto mb-3 bg-gray-100 border-2 border-dashed rounded-xl w-20 h-20 d-flex align-items-center justify-content-center">
        <span className="text-xs text-gray-400">Image</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{term}</h3>

      <div className="d-flex align-items-center justify-content-center text-success small">
        <svg className="w-5 h-5 me-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 5v10l7-5z" />
        </svg>
        <span className="font-medium">{usPhonetic}</span>
      </div>
    </div>
  );
};

export default VocabCard; // PHẢI CÓ