import React from 'react'
import styled from "styled-components"
import Header from './Header'

const FeedbackDetail = () => {
  return (
    <>
      <Header isLogin="true"/>
      <BodyContainer>
        <Title>{'면접 제목 >'} 상세 피드백 보기</Title>
        <Container>

        </Container>
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
`;

export default FeedbackDetail