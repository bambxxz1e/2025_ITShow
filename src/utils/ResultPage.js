import React, { useEffect, useRef, useState } from 'react';
import teacherImg from '../img/kim_0.png'; // 선생님 이미지
import ttsFile from '../audio/sample.mp3'; // 자동재생할 오디오 파일

const ResultPage = () => {
  const audioRef = useRef(null);
  const [showEndBtn, setShowEndBtn] = useState(false);

  useEffect(() => {
    // 자동 재생
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log('AutoPlay 실패:', err));
    }

    // 5초 후 버튼 표시
    const timer = setTimeout(() => setShowEndBtn(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnd = () => {
    alert("끝내기 클릭됨!");
    // 페이지 이동 등 추가 로직 가능
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
      {/* 오른쪽 위 test 텍스트 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '30px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px'
      }}>
        test
      </div>

      {/* 왼쪽 아래 선생님 이미지 */}
      <img
        src={teacherImg}
        alt="선생님"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          width: '120px',
        }}
      />

      {/* 음성 텍스트 내용 */}
      <div style={{
        position: 'absolute',
        right: '50px',
        top: '40%',
        color: 'white',
        fontSize: '18px',
        textAlign: 'right',
        maxWidth: '400px',
      }}>
        <p><strong>AI의 답변:</strong> 소프트웨어과의 암채님, "주고싶어"에 대해 영철 선생님이 조언을 드릴게요!</p>
      </div>

      {/* 오디오 자동 재생 (숨김) */}
      <audio ref={audioRef} src={ttsFile} hidden />

      {/* 끝내기 버튼 (5초 후 등장) */}
      {showEndBtn && (
        <button
          onClick={handleEnd}
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

export default ResultPage;
