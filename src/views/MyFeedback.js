import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../API";
import Header from "./Header";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const MyFeedback = () => {
  const navigate = useNavigate();
  const [dialectCountAvg, setDialectCountAvg] = useState(0);
  const [speechRateAvg, setspeechRateAvg] = useState(0);
  const [wordArr, setwordArr] = useState([]);

  const mostFrequent = (arr) =>
    Object.entries(
      arr.reduce((a, v) => {
        a[v] = a[v] ? a[v] + 1 : 1;
        return a;
      }, {})
    ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

  const getUserFeedbackAvg = async () => {
    let result = await API.getUserAverageScore();
    if (result) {
      console.log("flask get 성공");
      console.log(result);
      setDialectCountAvg(Math.round(result.dialectCountAvg));
      setspeechRateAvg(Math.round(result.speechRateAvg));
      setwordArr(mostFrequent(result.wordArr));
    } else {
      console.log("Flask get 실패");
    }
  };
  const popover = (header, body) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{header}</Popover.Header>
      <Popover.Body>{body}</Popover.Body>
    </Popover>
  );
  useEffect(() => {
    getUserFeedbackAvg();
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <Text>마이페이지</Text>
        <Title>전체 피드백 평균 점수</Title>
        <Container>
          <OverlayTrigger
            trigger="hover"
            placement="top"
            overlay={popover(
              "사투리 사용 평균 횟수",
              "사투리 사용 평균 횟수는 1회 면접 당 평균적으로 사투리를 사용하는 횟수를 말합니다."
            )}
          >
            <FeedbackPurple>
              <span>
                사투리 사용
                <br />
                평균 횟수
              </span>
              <span>{dialectCountAvg}번</span>
            </FeedbackPurple>
          </OverlayTrigger>
          <OverlayTrigger
            trigger="hover"
            placement="top"
            overlay={popover(
              "말의 빠르기",
              "말의 빠르기는 음절/시간(초)를 통해 1초에 몇 음절을 말하는지 나타냅니다."
            )}
          >
            <Feedback>
              <span>말의 빠르기</span>
              <span>{speechRateAvg}</span>
            </Feedback>
          </OverlayTrigger>
          <OverlayTrigger
            trigger="hover"
            placement="top"
            overlay={popover(
              "단어",
              "단어는 전체 면접 중 가장 많이 사용하는 단어를 말합니다."
            )}
          >
            <Feedback>
              <span>단어</span>
              <span>{wordArr}</span>
            </Feedback>
          </OverlayTrigger>
        </Container>
        <ButtonContainer>
          <Button onClick={() => navigate("/feedback/list")}>
            전체 피드백 목록
          </Button>
          <Button onClick={() => navigate("/interview/info")}>
            모의면접 시작하기
          </Button>
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
  height: calc(100vh-5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 30rem;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 0 0 1.5rem 0;
`;

const Text = styled.div`
  width: 100%;
  font-family: Pretendard;
  font-size: 1.2rem;
  text-align: start;
  padding: 0 12rem;
`;

const Container = styled.div`
  display: flex;
`;

const FeedbackPurple = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 5rem;
  height: 15rem;
  padding: 2rem 0;
  margin: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: white;
  background: #4f46ba;
  border-radius: 60.399px;
`;

const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 5rem;
  height: 15rem;
  padding: 2rem 0;
  margin: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  border: 1px solid #e2e2e2;
  border-radius: 60.399px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  box-sizing: border-box;
  background: #6754cb;
  color: white;
  width: 18rem;
  padding: 0.8rem;
  margin: 0.3rem 0;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #5850e6;
    transition: 0.3s;
  }
`;

export default MyFeedback;
