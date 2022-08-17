import React from "react";
import styled from "styled-components";

function FeedbackField({ count, speed, word, accent }) {
  return (
    <>
      <div className="row text-center">
        <div className="col mt-2">
          <Container>
            <span>사투리 사용 횟수</span>
            <span>{count}회</span>
          </Container>
        </div>
        <div className="col mt-2">
          <Container>
            <span>말의 빠르기</span>
            <span>{speed}점</span>
          </Container>
        </div>
        <div className="w-100"></div>
        <div className="col mt-2">
          <Container>
            <span>가장 많이 반복된 단어</span>
            <span>{word}</span>
          </Container>
        </div>
        <div className="col mt-2">
          <Container>
            <span>억양</span>
            <span>{accent}점</span>
          </Container>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  backgroud: #ffffff;
  border: 1px solid #e2e2e2;
  box-shadow: 0px 10px 6px rgba(0, 0, 0, 0.01);
  border-radius: 50px;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
`;

export default FeedbackField;
