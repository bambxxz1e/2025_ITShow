import React from 'react';
import silhouetteImg from '../img/tlffndpt.png'; // 실루엣 이미지 추가 필요

const SilhouetteScreen = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0e0e1f',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white',
      animation: 'fadeIn 1s ease-in-out',
    }}>
      <img
        src={silhouetteImg}
        alt="선생님 실루엣"
        style={{
          maxHeight: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 40px #a78bfa)',
          animation: 'floatIn 1s ease-in-out',
        }}
      />
      <p style={{
        marginTop: '30px',
        fontSize: '20px',
        color: '#e0e0ff',
        textShadow: '0 0 10px #c4b5fd',
      }}>
        조언을 전달받고 있어요...
      </p>
    </div>
  );
};

export default SilhouetteScreen;
