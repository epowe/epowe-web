import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Header from './Header'

const MyFeedback = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header isLogin="true"/>
      <BodyContainer>
        <Text>마이페이지</Text>
        <Title>전체 피드백 평균 점수</Title>
        <Container>
          <FeedbackPurple>
            <span>사투리 사용 평균 횟수</span>
            <span>99번</span>
          </FeedbackPurple>
          <Feedback>
            <span>억양</span>
            <span>80</span>
          </Feedback>
          <Feedback>
            <span>말의 빠르기</span>
            <span>90</span>
          </Feedback>
          <Feedback>
            <span>단어</span>
            <span>30</span>
          </Feedback>
        </Container>
        <ButtonContainer>
          <Button onClick={() => navigate("/feedback/list")}>전체 피드백 목록</Button>
          <Button onClick={() => navigate("/interview/info")}>모의면접 시작하기</Button>
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
  min-height: 30rem;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 0 0 1.5rem 0;
`;

const Text = styled.div`
  width: 100%;
  font-family: SCDream-Regular;
  font-size: 1.2rem;
  text-align: start;
  padding: 0 12rem;
`;

const Container = styled.div`
  display: flex;
`;

const FeedbackPurple = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 5rem;
  height: 15rem;
  padding: 2rem 0;
  margin: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: white;
  background: #4F46BA;
  border-radius: 60.399px;
`;

const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 5rem;
  height: 15rem;
  padding: 2rem 0;
  margin: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  border: 1px solid #E2E2E2;
  border-radius: 60.399px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 18rem;
  padding: 0.8rem;
  margin: 0.3rem 0;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
`;

export default MyFeedback