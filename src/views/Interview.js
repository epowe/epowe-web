import React from 'react'
import styled from "styled-components";
import Header from "./Header.js";

const Interview = () => {
  return (
    <>
      <Header/>
      <BodyContainer>
        <ButtonContainer>
          <Button>
            모의면접 시작하기
          </Button>
          <Button>
            내 피드백 보기
          </Button>   
        </ButtonContainer>
      </BodyContainer>
    </>
  )
}

const BodyContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6C63FF;
  color: white;
  width: 100%;
  padding: 15px;
  margin: 1vh 0;
  border: none;
  border-radius: 50px;
  font-family: Montserrat-Bold;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
`;

export default Interview