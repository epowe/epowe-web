import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import Header from "./Header.js";
import toast, { Toaster } from "react-hot-toast";

const InterviewInfo = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
    },
  ]);
  const videoRef = useRef(null);
  const [data, setData] = useState([]);
  const [src, setSrc] = useState(null);
  const mediaRecorder = useRef(null);
  const recordedMediaUrl = useRef(null);

  useBeforeunload((event) => event.preventDefault());

  const notify = (msg) =>
    toast(msg, {
      duration: 2500,
      style: {
        borderRadius: "50px",
      },
    });

  const addInputField = () => {
    setQuestions([
      ...questions,
      {
        question: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...questions];
    rows.splice(index, 1);
    setQuestions(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };

  const getWebcam = (callback) => {
    const constraints = {
      audio: { echoCancellation: true },
      video: {
        width: { min: 1280 },
        height: { min: 720 },
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(callback)
      .catch(() => {
        notify("카메라와 마이크 엑세스를 허용해주세요");
        setStarted(false);
      });
  };

  const handleStart = () => {
    let mediaData = [];
    if (title === "") {
      notify("면접 제목을 입력해주세요");
    } else if (!questions.every((q) => q.question !== "")) {
      notify("면접 질문을 입력해주세요");
    } else {
      if (questions.length === 1) {
        setIsNext(false);
      }
      setStarted(true);

      // 녹화 시작
      getWebcam((stream) => {
        console.log(stream);
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });
        videoRef.current.srcObject = stream;
        mediaRecorder.ondataavailable = (e) => {
          // blob 데이터 저장
          console.log(JSON.stringify(e.data.size));
          console.log(e.data);
          if (e.data && e.data.size > 0) {
            setData(e.data);
          }
        };
        // 녹화 중지 이벤트 핸들러 등록
        mediaRecorder.onstop = function() {
          const blob = new Blob(mediaData, {
            type: "video/webm",
          });
          recordMediaUrl = new URL.createObjectURL(blob);
        };
        mediaRecorder.start();
      });
    }
  };

  const handleNext = () => {
    setCurrent(current + 1);
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach((track) => {
      console.log(track);
      track.stop();
    });
    if (isNext) {
      if (current < questions.length - 2) {
        setIsNext(true);
      } else {
        setIsNext(false);
      }

      // 영상 출력 시작
      getWebcam((stream) => {
        console.log(stream);
        videoRef.current.srcObject = stream;
      });
    } else {
      videoDownload();
      navigate("/interview/feedback");
    }
  };

  //녹화 멈추기
  const stopRecord = (stream) => {
    if (mediaRecorder) {
      // 5. 녹화 중지
      mediaRecorder.stop();
      mediaRecorder = null;
    }
  };

  //녹화 시작
  const startRecord = (stream) => {
    //영상 녹화 생성자 생성
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp8",
    });
    console.log(mediaRecorder);
    mediaRecorder.start();
    console.log(mediaRecorder);
  };

  //녹화된 영상 로컬에 다운로드
  const videoDownload = () => {
    if (recordedMediaUrl) {
      const link = document.createElement("a");
      document.body.appendChild(link);
      // 녹화된 영상의 URL을 href 속성으로 설정
      link.href = recordedMediaUrl;
      // 저장할 파일명 설정
      link.download = "video.webm";
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    setrecordMediaUrl(null);
  }, [recordedMediaUrl]);
  return started ? (
    <>
      <Header />
      <BodyContainer>
        <Container>
          <Question>
            질문{current + 1} {questions.at(current).question}
          </Question>
          <Video>
            <div>
              <video
                ref={videoRef}
                autoPlay
                muted
                poster="../images/loading.gif"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </Video>
          <Button onClick={handleNext}>
            {isNext ? "다음" : "면접 끝내기"}
          </Button>
        </Container>
      </BodyContainer>
    </>
  ) : (
    <>
      <Header isLogin="true" />
      <BodyContainer>
        <Container>
          <Title>모의면접 정보 입력</Title>
          <div className="container">
            <div className="row my-3">
              <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                name="title"
                className="form-control shadow-none"
                placeholder="면접 제목"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xl-13">
                {questions.map((data, index) => {
                  const { question } = data;
                  return (
                    <div className="row my-3" key={index}>
                      <div className="col-11">
                        <div className="form-group">
                          <input
                            type="text"
                            onChange={(event) => handleChange(index, event)}
                            value={question}
                            name="question"
                            className="form-control shadow-none"
                            placeholder="질문"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="col-1">
                        {questions.length !== 1 ? (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => removeInputFields(index)}
                          >
                            x
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col-xl-4">
                    {questions.length < 5 ? (
                      <button
                        className="btn btn-sm btn-light"
                        onClick={addInputField}
                      >
                        질문 추가
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleStart}>면접 시작</Button>
          <Toaster containerStyle={{ top: "5.1rem" }} />
        </Container>
      </BodyContainer>
    </>
  );
};

const BodyContainer = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30rem;
  width: 30%;
  height: 90%;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem;
`;

const Question = styled.div`
  width: 600px;
  font-family: SCDream-Regular;
  font-size: 1.2rem;
  text-align: start;
  padding: 2rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  position: sticky;
  top: 100%;
  background: #6c63ff;
  color: white;
  width: 90%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
`;

const Video = styled.div`
  min-height: 360px;
  width: 640px;
`;

export default InterviewInfo;
