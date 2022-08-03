import React, { useRef } from 'react'
import styled from "styled-components"
import Header from './Header'
import FeedbackDetailTable from './FeedbackDetailTable'
import VideoPlayer from './VideoPlayer'

const FeedbackDetail = () => {
  const playerRef = useRef();

  const handleClick = (time) => {
    let s = time.split(':');
    let seconds = (+s[0])*60+(+s[1]);
    playerRef.current.seekTo(seconds);
  };

  return (
    <>
      <Header isLogin="true"/>
      <BodyContainer>
      <Title>{'면접제목 >'} 상세 피드백 보기
        <br/>
        <Question>질문 1 자기소개</Question>
      </Title>
        <Container>
          <VideoContainer>
            <VideoPlayer playerRef={playerRef}/>
          </VideoContainer>
          <TableContainer>
            <FeedbackDetailTable handleClick={handleClick} />
          </TableContainer>
        </Container>
      </BodyContainer>
    </>
  )
}

const BodyContainer = styled.div`
  position: fixed;
  top: 10rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 80vh;
`;

const Title = styled.div`
  position: fixed;
  top: 5rem;
  left: 12rem;
  font-family: SCDream-Regular;
  font-size: 1.2rem;
  text-align: start;
  margin: 1rem;
`;

const Container = styled.div`
  display: flex;
  margin: 0 10rem;
  height: 70vh;
  padding-top: 3rem;
`;

const TableContainer = styled.div`
  flex-shrink: 0;
  text-align: center;
  overflow-y: auto;
  padding: 1rem;
  width: 50%;
  flex: 1;
`;

const VideoContainer = styled.div`
  width: 50%;
  margin: 1rem;
  flex: 1;
`;

const Video = styled.div`
  padding-top: 56.25%;
  background-color: black;
`;

const Question = styled.div`
  width: 100%;
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: start;
  margin: 1rem;
`;

export default FeedbackDetail