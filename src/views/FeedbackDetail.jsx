import React from 'react'
import styled from "styled-components"
import Header from './Header'
import FeedbackDetailTable from './FeedbackDetailTable'

const FeedbackDetail = () => {
  return (
    <>
      <Header isLogin="true"/>
      <Title>{'면접제목 >'} 상세 피드백 보기
      <br/>
      <Question>질문 1 자기소개</Question>
      </Title>
      <BodyContainer>
        <Container>
          <VideoContainer>
            <Video />
          </VideoContainer>
          <TableContainer>
            <FeedbackDetailTable />
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
  margin: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 10rem;
  height: 100%;
`;

const TableContainer = styled.div`
  flex-shrink: 0;
  text-align: center;
  overflow-y: auto;
  flex-shrink: 0;
  padding: 1rem;
  width: 50%;
  max-height: 80%;
`;

const VideoContainer = styled.div`
  flex-shrink: 0;
  background-color: black;
  width: 50%;
  flex-shrink: 0;
  margin: 1rem;
`;

const Video = styled.div`
  padding-top: 56.25%;
`;

const Question = styled.div`
  position: relative;
  top: 2.5rem;
  width: 100%;
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: start;
`;

export default FeedbackDetail