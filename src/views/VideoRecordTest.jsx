import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddRemoveInputField from "./AddRemoveInputField.jsx";
import Header from "./Header.js";

const VideoRecordTest = () => {
  const navigate = useNavigate();
  const titleRef = useRef();

  const onStart = () => {
    if (titleRef.current.value !== "") {
      //if (질문 1개 이상 입력했는지 확인하기) {
      //  제목+질문들 처리하기
      //  navigate('/interview?q=1'); // ???
      //}
      //else { alert(); //-> modal로 바꾸기 }
    } else {
      alert("면접 제목을 입력해주세요"); //-> modal로 바꾸기
    }
  };

  return (
    <>
      <Header isLogin="true" />
      <BodyContainer>
        <Container>
          <Title>질문1: 자기소개</Title>
          <Button onClick={onStart}>다음</Button>
        </Container>
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
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30rem;
  width: 30%;
  height: 90%;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: left;
  margin: 1.5rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  position: sticky;
  top: 100%;
  background: #6c63ff;
  color: white;
  width: 90%;
  padding: 0.8rem;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
`;

export default VideoRecordTest;
