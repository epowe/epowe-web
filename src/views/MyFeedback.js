import React from 'react'
import styled from "styled-components"
import Header from './Header'

const MyFeedback = () => {
  return (
    <>
      <Header isLogin="true"/>
      <BodyContainer>
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
        <Button>전체 피드백 목록</Button>
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
  overflow-y: auto;
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem;
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
  box-shadow: 0px 50.7352px 78.5187px rgba(20, 34, 244, 0.14), 0px 32.8839px 45.9844px rgba(20, 34, 244, 0.106296), 0px 19.5424px 25.0097px rgba(20, 34, 244, 0.085037), 0px 10.147px 12.7593px rgba(20, 34, 244, 0.07), 0px 4.13398px 6.39782px rgba(20, 34, 244, 0.054963), 0px 0.939541px 3.08986px rgba(20, 34, 244, 0.0337037);
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
  box-shadow: 0px 120.798px 96.6385px rgba(0, 0, 0, 0.01), 0px 78.295px 56.5961px rgba(0, 0, 0, 0.00759259), 0px 46.5296px 30.7811px rgba(0, 0, 0, 0.00607407), 0px 24.1596px 15.7037px rgba(0, 0, 0, 0.005), 0px 9.84281px 7.87424px rgba(0, 0, 0, 0.00392593), 0px 2.237px 3.8029px rgba(0, 0, 0, 0.00240741);
  border-radius: 60.399px;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 18rem;
  padding: 0.8rem;
  margin: 1rem 0;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
`;

export default MyFeedback