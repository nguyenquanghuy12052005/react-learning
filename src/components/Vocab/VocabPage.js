import React, { useState } from 'react';
import VocabCard from './VocabCard';
import VocabModal from './VocabModal';
import vocabData from '../../data/toeic_vocab.json';
import '../../components/Vocab/Vocab.scss';

const VocabPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div className="vocab-page">
      <div className="container">
        <h1 className="text-center mb-5">TOEIC Vocabulary</h1>

        {/* ✅ Dùng grid tùy chỉnh thay vì Bootstrap row */}
        <div className="vocab-grid">
          {vocabData.map((word, i) => (
            <VocabCard key={i} word={word} onClick={setSelectedWord} />
          ))}
        </div>

        <VocabModal word={selectedWord} onClose={() => setSelectedWord(null)} />
      </div>
    </div>
  );
};

export default VocabPage;
