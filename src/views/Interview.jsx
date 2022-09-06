import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";
import interviewImg from "../images/interviewImg.svg";

const Interview = () => {
  const navigate = useNavigate();

  const onClickStart = () => {
    navigate("/interview/info");
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <ButtonContainer>
          <Button onClick={onClickStart}>모의면접 시작하기</Button>
          <Button onClick={() => navigate("/feedback")}>내 피드백 보기</Button>
        </ButtonContainer>
        <div style={{flex: '1', textAlign: 'center'}}>
          <img src={interviewImg} alt="interviewImg" style={{width: '70%'}}/>
        </div>
      </BodyContainer>
    </>
  );
};

const BodyContainer = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh-5rem);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgb(173,159,247);
  background: linear-gradient(270deg, rgba(173,159,247,1) 0%, rgba(123,106,216,1) 70%, rgba(103,84,203,1) 100%);
  `;

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: transparent;
  color: white;
  width: 50%;
  padding: 0.8rem;
  margin: 1vh 0;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #6754cb;
    color: white;
    transition: 0.3s;
  }
`;

export default Interview;
