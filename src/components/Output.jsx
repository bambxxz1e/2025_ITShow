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
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #c084fc, #e9d5ff)',
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* 오른쪽 상단 텍스트 출력 */}
      <div style={{
        position: 'absolute',
        top: '180px',
        right: '80px',
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
        maxWidth: '700px',
        textAlign: 'right',
        lineHeight: '1.6',
        wordBreak: 'break-word',
        boxShadow: '0 0 10px #d08aff, 0 0 20px #a76aff, 0 0 30px #9f58ff',
        borderRadius: '20px',
        padding: '20px 30px',
        background: 'rgba(50, 10, 80, 0.3)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(200, 150, 255, 0.3)',
        transition: 'box-shadow 0.3s ease',
      }}>
        {text}
      </div>

      {/* 💡강렬한 빛무리 */}
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgb(255, 255, 255), transparent 80%)',
          animation: 'shine 2.5s infinite ease-in-out',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* 왼쪽 하단 선생님 이미지 */}
      <img
        src={ai.image}
        alt="선생님"
        style={{
          position: 'absolute',
          bottom: '0px',
          left: '-100px',
          width: '700px',
          objectFit: 'contain',
          zIndex: 1,
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
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          끝내기
        </button>
      )}

      {/* ✨ 반짝임 애니메이션 정의 */}
      <style>
        {`
          @keyframes shine {
            0% {
              transform: scale(1);
              opacity: 0.6;
              filter: blur(80px);
            }
            50% {
              transform: scale(1.4);
              opacity: 1;
              filter: blur(100px);
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
              filter: blur(80px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Output;
