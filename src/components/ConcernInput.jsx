import React, { useState } from 'react';
import starImg from '../img/star.png';
import './ConcernInput.css'; // ← CSS 파일 import 필요

function ConcernInput({ onSubmit }) {
  const [input, setInput] = useState('');
  const [isFlying, setIsFlying] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // 별이 사라지게 제어

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setIsFlying(true);

      // 별이 날아가는 동안 기다렸다가 숨기기
      setTimeout(() => {
        setIsVisible(false); // 별 숨김
        onSubmit(input.trim());
        setInput('');
        setIsFlying(false);

        // 필요하다면 나중에 다시 보여주기
        setTimeout(() => setIsVisible(true), 2000);
      }, 2000);
    }
  };

  return (
    <div className="star-container">
      {isVisible && (
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
      )}
    </div>
  );
}

export default ConcernInput;
