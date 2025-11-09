import React from 'react';
import '../../components/Vocab/Vocab.scss';

const VocabCard = ({ word, onClick }) => {
  const { word: term, meanings } = word;

  // Lấy nghĩa tiếng Việt đầu tiên (tách bởi ", " → lấy phần tử đầu)
  const shortMeaning = meanings[0]?.meaning_vi.split(', ')[0] || '—';

  return (
    <div className="vocab-card" onClick={() => onClick(word)}>
      <div className="vocab-image">Image</div>

      <h3>{term}</h3>

      <div className="meaning-preview">
        <span>{shortMeaning}</span>
      </div>
    </div>
  );
};

export default VocabCard;