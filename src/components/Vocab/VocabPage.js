import React, { useState } from 'react';
import VocabCard from './VocabCard';
import VocabModal from './VocabModal';
import vocabData from '../../data/toeic_vocab.json';

const VocabPage = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        <h1 className="text-center display-5 fw-bold text-primary mb-5">
          TOEIC Vocabulary
        </h1>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
          {vocabData.map((word, i) => (
            <div className="col" key={i}>
              <VocabCard word={word} onClick={setSelectedWord} />
            </div>
          ))}
        </div>

        <VocabModal word={selectedWord} onClose={() => setSelectedWord(null)} />
      </div>
    </div>
  );
};

export default VocabPage; // PHẢI CÓ