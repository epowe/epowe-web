import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import FeedbackField from "./FeedbackField";
import { API } from "../API";

const Feedback = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("/interview");
  };
  const location = useLocation();
  const title = location.state.title;

  const [feedback, setFeedback] = useState({});

  const getUserFeedback = async ({ title }) => {
    var result = await API.getOneUserInterviewData({ title });
    if (result) {
      console.log("flask get 성공");
      console.log(result);
      setFeedback(result);
    } else {
      console.log("Flask get 실패");
    }
  };

  useEffect(() => {
    getUserFeedback({ title });
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <Title>모의면접 평가 점수</Title>
        <FeedbackField {...feedback} />
        <ButtonContainer>
          <Button onClick={() => navigate("/feedback/list/questions", {state: {title}})}>
            상세 피드백 보기
          </Button>
          <Button onClick={onClickHome}>홈으로</Button>
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
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;
`;

const Title = styled.div`
  font-family: SCDream-Regular;
  font-size: 1.5rem;
  text-align: center;
  margin: 1.5rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6754cb;
  color: white;
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
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

export default Feedback;
