import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header.js";
import { API } from "../API.js";

const Interview = () => {
  const navigate = useNavigate();

  const onClickStart = () => {
    navigate("/interview/info");
  };

  const onClickFlaskPostTest = async () => {
    var result = await API.useFlaskTestPost({
      title: "제목입니다.",
      question: "질문입니다.",
      videoURL: "동영상 주소입니다.",
    });
    if (result) {
      console.log("flask에 Post 완료");
    } else {
      console.log("flask Post 실패");
      console.log(result);
    }
  };

  const onClickFlaskGetTest = async () => {
    var result = await API.useFlaskTestGet();
    if (result) {
      console.log("flask get 성공");
      console.log(result);
      if (result.dialectCount) {
        console.log("사투리 사용횟수:" + result.dialectCount);
      } else {
        console.log("사용횟수 존재x");
      }
      if (result.intonation) {
        console.log("억양 점수:" + result.intonation);
      } else {
        console.log("억양 점수 존재x");
      }
      if (result.speechRate) {
        console.log("말의 빠르기 점수:" + result.speechRate);
      } else {
        console.log("말의 빠르기 존재x");
      }
      if (result.word) {
        console.log("가장 많이 사용하는 단어:" + result.word);
      } else {
        console.log("가장 많이 사용하는 단어 존재x");
      }
    } else {
      console.log("Flask get 실패");
    }
  };
  return (
    <>
      <Header isLogin="true" />
      <BodyContainer>
        <ButtonContainer>
          {/* <Button onClick={onClickStart}>모의면접 시작하기</Button>
          <Button onClick={() => navigate("/feedback")}>내 피드백 보기</Button> */}
          <Button onClick={onClickFlaskPostTest()}>모의면접 시작하기</Button>
          <Button onClick={onClickFlaskGetTest()}>내 피드백 보기</Button>
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
  background: #6c63ff;
  color: white;
  width: 100%;
  padding: 0.8rem;
  margin: 1vh 0;
  border: none;
  border-radius: 50px;
  font-family: SCDream-Regular;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
`;

export default Interview;
