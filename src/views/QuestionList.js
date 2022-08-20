import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { API } from "../API";

const QuestionList = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { q: "자기소개" },
    { q: "성격의 장단점" },
    { q: "지원한 계기" },
    { q: "질문" },
    { q: "질문" },
  ]);

  const getUserQuestionList = async ({ question }) => {
    var result = await API.getUserQuestionList({ question });
    if (result) {
      console.log("flask get 성공");
      console.log(result);
    } else {
      console.log("Flask get 실패");
    }
  };

  useEffect(() => {
    getUserQuestionList({ question: "카카오 면접 준비" });
  }, []);

  return (
    <>
      <Header isLogin="true" />
      <BodyContainer>
        <Title>{"면접제목 >"} 질문 목록</Title>
        <Container>
          <QuestionContainer>
            {questions.map((question) => {
              return (
                <Question
                  onClick={() => navigate("/feedback/list/questions/detail")}
                >
                  {question.q}
                </Question>
              );
            })}
          </QuestionContainer>
          <SmallButton onClick={() => navigate(-1)}>면접 목록</SmallButton>
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
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
`;

const Question = styled.div`
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
  box-shadow: 0px 10px 6px rgba(0, 0, 0, 0.01);
  border-radius: 50px;
  padding: 0.8rem 1rem;
  text-align: center;
  width: 20%;
  cursor: pointer;
  margin: 0.5rem;
  &:hover {
    font-family: SCDream-Regular;
    transition: 0.3s ease-in;
  }
`;

const Container = styled.div`
  margin: 0 10rem;
  padding-top: 3rem;
  width: 100%;
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

export default QuestionList;
