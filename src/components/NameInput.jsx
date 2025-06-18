import React, { useState } from 'react';
import starImg from '../img/star.png';

function NameInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="star-container">
      <div className="star-wrapper">
        <img src={starImg} alt="별 이미지" className="star-image" />
        <div className="star-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="star-input"
            placeholder="이름을 입력하세요"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default NameInput;