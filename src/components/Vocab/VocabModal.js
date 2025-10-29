import React from 'react';

const VocabModal = ({ word, onClose }) => {
  if (!word) return null;

  const { word: term, phonetic, meanings } = word;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4">
          <div className="modal-header bg-primary text-white">
            <h3 className="modal-title fw-bold">{term}</h3>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <span className="badge bg-success fs-6 px-3 py-2">US {phonetic.us}</span>
              <span className="badge bg-info fs-6 px-3 py-2">UK {phonetic.uk}</span>
            </div>

            <div className="text-center mb-4">
              <div className="bg-light border border-dashed rounded-3 d-inline-block p-5">
                <em className="text-muted">"{term}" picture</em>
              </div>
            </div>

            {meanings.map((m, idx) => (
              <div key={idx} className="mb-5">
                <h5 className="text-primary fw-bold text-capitalize">{m.partOfSpeech}</h5>
                <ol className="ps-4 mb-3">
                  {m.meaning_vi.split(', ').map((vi, i) => (
                    <li key={i} className="mb-2"><strong>{vi}</strong></li>
                  ))}
                </ol>
                <p className="text-muted fst-italic mb-3">{m.definition_en}</p>

                {m.examples && m.examples.length > 0 && (
                  <div className="bg-light rounded p-3 mb-3">
                    <strong className="text-success">Ví dụ:</strong>
                    {m.examples.map((ex, i) => (
                      <div key={i} className="mt-2">
                        <p className="mb-1">• <strong>{ex.en}</strong></p>
                        <p className="mb-0 text-secondary fst-italic">{ex.vi}</p>
                      </div>
                    ))}
                  </div>
                )}

                {m.synonyms && m.synonyms.length > 0 && (
                  <p>
                    <strong className="text-warning">Từ đồng nghĩa:</strong>{' '}
                    <span className="text-muted">{m.synonyms.join(', ')}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabModal; // PHẢI CÓ