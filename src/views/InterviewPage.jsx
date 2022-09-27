import React, { useEffect, useRef, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { beginRecord, uploadVideoAndGetUrl, playStream, stopPlaying } from "./Record";
import { API } from "../API";

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state.title;
  const questions = location.state.questions;
  const speaker = location.state.speaker;
  const [urls, setUrls] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [recorder, setRecorder] = useState(undefined);
  const videoRef = useRef(null);
  const [recorded, setRecorded] = useState(false);
  const [done, setDone] = useState(false);
  const [sendable, setSendable] = useState(false);
  const [stoppable, setStoppable] = useState(false);

  useBeforeunload((event) => event.preventDefault());

  const beginOrStopRecording = async () => {
    try {
      if (!recorder) {
        const mediaRecorder = await beginRecord(
          (stream) => playStream(videoRef.current, stream),
          (recordedBlobs) => setData(recordedBlobs)
        );
        setStoppable(false);
        setRecorder(mediaRecorder);
        setTimeout(setStoppable, 10000, true);
      } else {
        if (!stoppable) {
          notify("10초 이상 답변 해주세요");
          return;
        }
        if (recorder.state === 'inactive') {
          stopPlaying(videoRef.current);
          setRecorder(undefined);
          setRecorded(true);
          setDone(true);
        } else {
          recorder.stop();
          stopPlaying(videoRef.current);
          setRecorder(undefined);
          setRecorded(true);
          setDone(true);
        }
      }
    } catch (err) {
      if (err.toString().includes("Permission denied")) {
        notify("카메라와 마이크 엑세스를 허용해주세요");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (questions.length === 1) {
      setIsNext(false);
    }
  }, []);

  useEffect(() => {
      if (!isNext) {
        let questionData = [];
        questionData.push(questions.map((a) => a.question));
        let sendQuestionData = questionData[0];
        console.log(sendQuestionData);
        console.log(urls);
        // 면접 정보 서버로 보내는 부분
        sendInterviewInfo({
          title: title,
          question: sendQuestionData,
          videoURL: urls,
          speaker: speaker,
        }).then((result) => {
          // 페이지 이동
          if (result.status === 200) {
            navigate("/interview/feedback", {state: {title}});
          } else {
            navigate("/error");
          }
        })
      }
  }, [sendable]);

  const notify = (msg) =>
    toast(msg, {
      duration: 2500,
      style: {
        borderRadius: "50px",
      },
    });

  //서버로 제목, 질문, 동영상 URL 보내는 함수
  const sendInterviewInfo = async ({ title, question, videoURL, speaker }) => {
    let result = await API.sendUserInterviewInfo({
      title: title,
      question: question,
      videoURL: videoURL,
      speaker: speaker,
    });

    if (result) {
      console.log("flask에 유저의 면접 정보 보내기 완료");
      return result;
    } else {
      console.log("flask에 유저의 면접 정보 보내기 실패");
      console.log(result);
      return result;
    }
  };

  const handleNext = () => {
    setRecorded(false);
    setDone(false);
    
    try {
      console.log(`질문${current + 1}: ${questions.at(current).question}`);
      // 녹화된 파일 s3에 전송 및 url 받기
      let getUrl = uploadVideoAndGetUrl(data);
      setUrls([...urls, getUrl]);
    } catch (err) {
      console.error(err);
    }

    if (isNext) {
      setCurrent(current + 1);
      if (current < questions.length - 2) {
        setIsNext(true);
      } else {
        setIsNext(false);
      }
    } else {
      setSendable(true);
    }
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <Container>
          <Question>
            질문{current + 1} {questions.at(current).question}
          </Question>
          <VideoContainer>
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "auto",
                height: "70vh",
              }}
              muted
            />
          </VideoContainer>
          <Button id="record" onClick={beginOrStopRecording} disabled={done}>
            {recorder ? "답변 그만하기" : "답변 시작하기"}
          </Button>
          <Button disabled={!recorded} onClick={handleNext}>
            {isNext ? "다음" : "면접 끝내기"}
          </Button>
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
  height: calc(100vh-5rem);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: auto;
`;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Question = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 1.2rem;
  text-align: start;
  padding: 2rem;
  padding-left: 12rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  position: fixed;
  top: 90%;
  background: #6754cb;
  color: white;
  width: 350px; 
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #4B3C93;
    transition: 0.3s;
  }
  &:disabled {
    display: none;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default InterviewPage;
