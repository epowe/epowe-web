import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";

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
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6754cb;
  color: white;
  width: 100%;
  padding: 0.8rem;
  margin: 1vh 0;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
`;

export default Interview;
