import React, { useState } from 'react';
import starImg from '../img/star.png';

function ConcernInput({ onSubmit }) {
  const [input, setInput] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setIsFlying(true);
      setTimeout(() => {
        onSubmit(input.trim());
        setInput('');
        setIsFlying(false);
      }, 2000);
    }
  };

  return (
    <div className="star-container">
      <div className={`star-wrapper ${isFlying ? 'fly' : ''}`}>
        <img src={starImg} alt="별 이미지" className="star-image" />
        
        {!isFlying && (
          <div className="star-form">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="star-input concern-input"
              placeholder="고민이 뭐야?"
              rows="3"
              autoFocus
            />
            <button onClick={handleSubmit} className="star-submit-button">
              고민 전달하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConcernInput;