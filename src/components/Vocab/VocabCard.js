import React from 'react';
import '../../components/Vocab/Vocab.scss';

const VocabCard = ({ word, onClick }) => {
  const { word: term, phonetic } = word;
  const usPhonetic = phonetic.us.replace(/[\/]/g, '');

  return (
    <div className="vocab-card" onClick={() => onClick(word)}>
      <div className="vocab-image">Image</div>

      <h3>{term}</h3>

      <div className="phonetic">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 5v10l7-5z" />
        </svg>
        <span>{usPhonetic}</span>
      </div>
    </div>
  );
};

export default VocabCard;
