import React, { useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FeedbackField from './FeedbackField';

const Feedback = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("/interview");
  }

  const [feedback, setFeedback] = useState({
    count: 0,
    speed: 0,
    word: '저기',
    accent: 0,
  });

  return (
    <>
      <Header isLogin="true" />
      <BodyContainer>
        <Title>모의면접 평가 점수</Title>
        <FeedbackField {...feedback} />
        <ButtonContainer>
          <Button onClick={() => navigate("/feedback/list/questions")}>
            상세 피드백 보기
          </Button>   
          <Button onClick={onClickHome}>
            홈으로
          </Button>   
        </ButtonContainer>
      </BodyContainer>
    </>
  )
}

const BodyContainer = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
`;

export default Feedback