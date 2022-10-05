import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { API } from "../API";

const QuestionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;

  const [questions, setQuestions] = useState([]);

  const getUserQuestionList = async ({ title }) => {
    let result = await API.getUserQuestionList({ title });
    if (result) {
      console.log("flask get 성공");
      setQuestions(result.questions);
    } else {
      console.log("Flask get 실패");
    }
  };

  useEffect(() => {
    getUserQuestionList({ title });
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <Title>{`${title} > 질문 목록`}</Title>
        <Container>
          <QuestionContainer>
            {questions.map((question, index) => {
              return (
                <Question
                  key={index}
                  onClick={() => navigate("/feedback/list/questions/detail", {state: {index, title, question}})}
                >
                  {question}
                </Question>
              );
            })}
          </QuestionContainer>
          <SmallButton onClick={() => navigate("/feedback/list")}>면접 목록</SmallButton>
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
  height: calc(100vh-5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.div`
  position: fixed;
  top: 5rem;
  left: 12rem;
  font-family: Pretendard;
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
    font-family: Pretendard;
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
