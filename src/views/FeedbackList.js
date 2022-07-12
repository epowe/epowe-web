import React from 'react'
import styled from "styled-components"
import FeedbackTable from './FeedbackTable'
import Header from './Header'

const FeedbackList = () => {
  return (
    <>
      <Header isLogin="true"/>
      <BodyContainer>
        <Title>전체 피드백 목록</Title>
        <TableContainer>
          <FeedbackTable />
        </TableContainer>
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
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem;
`;

const TableContainer = styled.div`
  text-align: center;
  overflow-y: auto;
  max-height: 30rem;
`;

export default FeedbackList