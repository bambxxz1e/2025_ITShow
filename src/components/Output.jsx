import React, { useEffect, useRef, useState } from 'react';

const Output = ({ text, ai, onDone }) => {
  const audioRef = useRef(null);
  const [showEndBtn, setShowEndBtn] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log('자동 재생 실패:', err));
    }

    const timer = setTimeout(() => setShowEndBtn(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #c084fc, #e9d5ff)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 오른쪽 상단 텍스트 출력 */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
        maxWidth: '400px',
        textAlign: 'right',
        lineHeight: '1.6',
      }}>
        {text}
      </div>

      {/* 왼쪽 하단 선생님 이미지 */}
      <img
        src={ai.image}
        alt="선생님"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          width: '140px',
          objectFit: 'contain',
        }}
      />

      {/* 오디오 자동 재생 */}
      <audio ref={audioRef} src={ai.voice} hidden />

      {/* 끝내기 버튼 */}
      {showEndBtn && (
        <button
          onClick={onDone}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            padding: '10px 20px',
            backgroundColor: 'white',
            color: '#6b21a8',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          끝내기
        </button>
      )}
    </div>
  );
};

export default Output;
