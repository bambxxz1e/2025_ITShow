// src/components/Output.jsx
import React, { useEffect, useRef, useState } from 'react';
import { voiceMap } from '../data/voiceMap';

const Output = ({ text, ai, onDone }) => {
  const audioRef = useRef(null);
  const [showEndBtn, setShowEndBtn] = useState(false);
  const [aiInfo, setAiInfo] = useState(null);

  // AI 정보 설정 - voiceMap에서 찾기
  useEffect(() => {
    if (ai?.name && voiceMap[ai.name]) {
      setAiInfo(voiceMap[ai.name]);
      console.log("AI 정보 확인:", voiceMap[ai.name]);
    }
  }, [ai]);

  // 오디오 재생
  useEffect(() => {
    if (ai?.voice && audioRef.current) {
      audioRef.current.src = ai.voice; // App.js에서 이미 blob URL로 변환해서 전달
      audioRef.current.play().catch((err) => {
        console.log('자동 재생 실패:', err);
      });
    }
  }, [ai?.voice]);

  // 끝내기 버튼 표시 타이머
  useEffect(() => {
    const timer = setTimeout(() => setShowEndBtn(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 오디오 종료 시 버튼 표시
  const handleAudioEnded = () => {
    setShowEndBtn(true);
  };

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
      {/* 텍스트 출력 */}
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

      {/* 선생님 이미지 출력 */}
      {aiInfo?.image && (
        <img
          src={aiInfo.image}
          alt="선생님"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            width: '140px',
            objectFit: 'contain',
          }}
        />
      )}

      {/* 오디오 출력 */}
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        hidden 
      />

      {/* 버튼 */}
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

      {/* 디버깅 정보 (개발 중에만 표시) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          <div>받은 AI 이름: {ai?.name}</div>
          <div>찾은 AI 정보: {aiInfo?.name}</div>
          <div>음성 URL: {ai?.voice ? '있음' : '없음'}</div>
        </div>
      )}
    </div>
  );
};

export default Output;