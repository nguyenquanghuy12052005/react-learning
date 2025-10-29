import React from 'react';
import logo from '../../assets/logo5.png';

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
{/* 
            <div className="text-center mb-4">
              <div className="bg-light border border-dashed rounded-3 d-inline-block p-5">
                <em className="text-muted">"{term}" {"https://www.bing.com/ck/a?!&&p=dcb39c989c5d0d2c22c0e0005412382fa4e1826507fb36e859e7425099ffe5abJmltdHM9MTc2MTY5NjAwMA&ptn=3&ver=2&hsh=4&fclid=2c6cd504-730b-6622-1cf6-c0e472a167c0&u=a1L2ltYWdlcy9zZWFyY2g_cT0lZTElYmElYTNuaCZpZD04RUYwQ0ExNzJEMjQzQzZEQzYwQ0ZGNThEODYzQjFGNkU3Njg1QkUyJkZPUk09SVFGUkJB"}</em>
              </div>
            </div> */}
              <div className="text-center mb-4">
              <div className="bg-light border rounded-3 p-3">
          {word.image && (
  <div className="text-center mb-3">
    <img
      src={word.image === "logo" ? logo : word.image}
      alt={term}
      className="img-fluid rounded shadow"
      style={{ maxHeight: "200px", objectFit: "contain" }}
    />
  </div>
)}

                <div className="text-muted mt-2">
                  <small>Ảnh minh họa cho "{term}"</small>
                </div>
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