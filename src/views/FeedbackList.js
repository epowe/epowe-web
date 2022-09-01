import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import FeedbackTable from './FeedbackTable'
import Header from './Header'

const FeedbackList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <BodyContainer>
        <Title>전체 피드백 목록</Title>
        <TableContainer>
          <FeedbackTable />
        </TableContainer>
        <SmallButton onClick={() => navigate(-1)}>마이페이지</SmallButton>
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
  height: 100%;
  text-align: center;
  overflow-y: auto;
  max-height: 30rem;
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

export default FeedbackList