import labelImage from "./img/name.png"; // ← 글씨 이미지 파일 경로 맞춰서
import axios from "axios";
import React, { useState } from "react";
import { selectRandomAI } from "./utils/selectRandomAI";
import { voiceMap } from "./data/voiceMap";

import CrystalBallScene from "./components/CrystalBallScene";
import NameInput from "./components/NameInput";
import ConcernInput from "./components/ConcernInput";
import Output from "./components/Output";

import titleImg from "./img/title.png";

import "./App.css";

function App() {
  const [step, setStep] = useState("start");
  const [major, setMajor] = useState("");
  const [name, setName] = useState("");
  const [concern, setConcern] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [showConcernInput, setShowConcernInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [selectedAI, setSelectedAI] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // 소속 입력 구분 
  const convertMajorToDepartment = (major) => {
    if (major === "소프트웨어과") return "S";
    if (major === "디자인과") return "D";
    return "E"; // 외부인
  };

  const handleStartClick = () => {
    setStep("major");
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleMajorSubmit = () => {
    if (major) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep("nameInput");
        setCurrentMessage("name");
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setIsAnimating(true);
    setShowConcernInput(false);

    setTimeout(() => {
      setStep("concernInput");
      setCurrentMessage("pretty");
      setIsAnimating(false);

      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentMessage("worry");
          setShowConcernInput(true);
          setIsAnimating(false);
        }, 500);
      }, 2500);
    }, 500);
  };

  const handleConcernSubmit = async (enteredConcern) => {
    setConcern(enteredConcern);
    setCurrentMessage("");
    setStep("result");
    setIsAnimating(true);

    const selected = selectRandomAI();
    setSelectedAI(selected);

    try {
      const response = await axios.post("http://localhost:5000/make-prompt", {
        name: name,
        worry: enteredConcern,
        department:
          major === "소프트웨어과" ? "S" : major === "디자인과" ? "D" : "O",
      });

      const { voice, text, audio } = response.data;
      setAnswer(text);

      // base64 audio를 blob URL로 변환
      const blob = new Blob(
        [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
        {
          type: "audio/mpeg",
        }
      );
      const voiceUrl = URL.createObjectURL(blob);

      setSelectedAI((prev) => ({
        ...prev,
        voice: voiceUrl,
      }));
    } catch (error) {
      console.error("AI 응답 에러:", error);
      setAnswer("AI 선생님의 조언을 가져오는 데 실패했어요.");
    }
  };

  const handleRestart = () => {
    setStep("start");
    setMajor("");
    setName("");
    setConcern("");
    setAnswer("");
    setSelectedAI(null);
    setCurrentMessage("");
    setShowConcernInput(false);
    setIsAnimating(false);
  };

  const showCrystalBall =
    step === "major" || step === "nameInput" || step === "concernInput";

  return (
    <div
      className="app-background"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Crystal Ball (왼쪽 상단으로 이동) */}
      {showCrystalBall && (
        <div
          style={{
            position: "absolute",
            bottom: "40%",
            left: "10%",
            width: "350px",
            height: "350px",
            zIndex: 10,
            transform: isAnimating ? "scale(1.05)" : "scale(1)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 20px 40px rgba(255, 255, 255, 0.1))",
          }}
        >
          <CrystalBallScene />
          {/* 수정구슬 위 글자 이미지 */}
          <img
            src={labelImage}
            alt="구슬 위 글자"
            style={{
              position: "absolute",
              top: "80px",
              left: "60%",
              transform: "translateX(-50%)",
              width: "280px",
              height: "auto",
              zIndex: 999,
              pointerEvents: "none",
            }}
          />

          {/* Mystic Glow Effect */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "400px",
              height: "400px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(147, 197, 253, 0.1) 0%, transparent 70%)",
              animation: "pulse 3s infinite alternate",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* Animated Background Particles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 20% 30%, rgba(147, 197, 253, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(196, 181, 253, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      {step === "start" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onClick={handleStartClick}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <img
            src={titleImg}
            alt="타이틀"
            style={{
              maxWidth: "80%",
              height: "auto",
              filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>
      ) : step === "result" ? (
        <Output text={answer} ai={selectedAI} onDone={handleRestart} />
      ) : (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingLeft: "55%",
            paddingBottom: "7%",
          }}
        >
          {/* Main Input Container (오른쪽 하단) */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "40px 50px",
              minWidth: "400px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
              transform: isAnimating ? "translateY(-10px)" : "translateY(0)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {step === "major" && (
              <div style={{ color: "white" }}>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    marginBottom: "30px",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #93c5fd, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  소속을 선택해주세요
                </h2>

                <div style={{ marginBottom: "30px" }}>
                  {["소프트웨어과", "디자인과", "외부인"].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "block",
                        marginBottom: "16px",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "12px 20px",
                        borderRadius: "12px",
                        backgroundColor:
                          major === option
                            ? "rgba(147, 197, 253, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border:
                          major === option
                            ? "2px solid rgba(147, 197, 253, 0.5)"
                            : "2px solid transparent",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                      }}
                      onMouseEnter={(e) => {
                        if (major !== option) {
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (major !== option) {
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.05)";
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="major"
                        value={option}
                        onChange={(e) => setMajor(e.target.value)}
                        style={{
                          marginRight: "12px",
                          transform: "scale(1.2)",
                          accentColor: "#93c5fd",
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleMajorSubmit}
                  disabled={!major}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: "16px",
                    border: "none",
                    background: major
                      ? "linear-gradient(135deg, #93c5fd, #a78bfa)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: major ? "#1e293b" : "rgba(255, 255, 255, 0.5)",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: major ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    transform: major ? "translateY(0)" : "translateY(2px)",
                    boxShadow: major
                      ? "0 10px 25px rgba(147, 197, 253, 0.3)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (major) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 15px 35px rgba(147, 197, 253, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (major) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 10px 25px rgba(147, 197, 253, 0.3)";
                    }
                  }}
                >
                  {major ? "선택 완료" : "소속을 선택해주세요"}
                </button>
              </div>
            )}

            {step === "nameInput" && (
              <div
                style={{
                  transform: isAnimating
                    ? "scale(0.95) opacity(0)"
                    : "scale(1) opacity(1)",
                  transition: "all 0.5s ease",
                }}
              >
                <NameInput onSubmit={handleNameSubmit} />
              </div>
            )}

            {step === "concernInput" && showConcernInput && (
              <div
                style={{
                  transform: isAnimating
                    ? "scale(0.95) opacity(0)"
                    : "scale(1) opacity(1)",
                  transition: "all 0.5s ease",
                }}
              >
                <ConcernInput onSubmit={handleConcernSubmit} />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap");
      `}</style>
    </div>
  );
}

export default App;
