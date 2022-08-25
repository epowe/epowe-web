import React, { useRef, useState } from 'react'
import styled from "styled-components"
import Header from './Header'
import FeedbackDetailTable from './FeedbackDetailTable'
import VideoPlayer from './VideoPlayer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { API } from '../API'

const FeedbackDetail = () => {
  const playerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const question = location.state.question;
  const [detail, setDetail] = useState([]);
  const [url, setUrl] = useState("");

  const handleClick = (time) => {
    let s = time.split(':');
    let seconds = (+s[0])*60+(+s[1]);
    playerRef.current.seekTo(seconds);
  };

  const getUserFeedbackDetail = async ({title, question}) => {
    var result = await API.getUserInterviewDetail(title, question);
    if (result) {
      console.log("flask get 성공");
      console.log(result);
      setDetail(result.detail);
      setUrl(result.videoUrl);
    } else {
      console.log("Flask get 실패");
    }
  }

  useEffect(() => {
    getUserFeedbackDetail({title, question});
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
      <Title>{`${title} > 상세 피드백 보기`}
        <br/>
        <Question>{`질문 ) ${question}`}</Question>
      </Title>
        <Container>
          <VideoContainer>
            <VideoPlayer playerRef={playerRef} url={url}/>
          </VideoContainer>
          <TableContainer>
            <FeedbackDetailTable handleClick={handleClick} detailData={detail.detail}/>
          </TableContainer>
        <SmallButton onClick={()=>navigate(-1)}>질문 목록</SmallButton>
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

const Question = styled.div`
  width: 100%;
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: start;
  margin: 1rem;
`;

const SmallButton = styled.button`
  border: 0;
  border-radius: 50px;
  padding: 8px;
  position: fixed;
  top: 90%;
  left: 80%;
  width: 100px;
  background: #f2f2f2;
  &:hover {
    background: #e3e3e3;
    transition: 0.3s;
  }
`;

export default FeedbackDetail