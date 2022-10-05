import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import styled from "styled-components";
import Header from "./Header.js";
import { API } from "../API.js";

const InterviewInfo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
    },
  ]);

  useBeforeunload((event) => event.preventDefault());

  const addInputField = () => {
    setQuestions([
      ...questions,
      {
        question: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...questions];
    rows.splice(index, 1);
    setQuestions(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };

  const handleStart = async () => {
    let qs = document.querySelectorAll(".form-control");
    if (title === "" || !questions.every((q) => q.question !== "") ) {
      qs.forEach((q) => {
        if (q.value == "") {
          setTitleInvalidFeedback("제목을 입력해주세요.");
          q.classList.add("is-invalid");
        } else {
          q.classList.remove("is-invalid");
        }
      });
    } else {
      qs.forEach((q) => {
        if (q.value == "") {
          setTitleInvalidFeedback("제목을 입력해주세요.");
          q.classList.add("is-invalid");
        } else {
          q.classList.remove("is-invalid");
        }
      });
      let result = await API.getTitleOverlap({ title });
      if (result === 200) {
        // 면접 페이지로 이동
        let speaker = document.querySelector('input[name="speaker"]:checked').value;
        navigate("/interview/ing", { state: { title, questions, speaker } });
      } else {
        // 면접 제목 중복 안내
        setTitleInvalidFeedback("중복된 제목입니다.");
        qs.forEach((q) => {
          if (q.name == "title") {
            q.classList.add("is-invalid");
          }
        });
      }
    }
  };

  const [titleInvalidFeedback, setTitleInvalidFeedback] =
    useState("제목을 입력해주세요.");
  const [questionInvalidFeedback, setQuestionInvalidFeedback] =
    useState("질문을 입력해주세요.");
  return (
    <>
      <Header />
      <BodyContainer>
        <Container>
          <Title>모의면접 정보 입력</Title>
          <div style={{backgroundColor: 'whiteSmoke', borderRadius: '50px', padding: '20px 30px', margin: '0 0 12px 0'}}>
            <p style={{margin: '0'}}>모의면접은 <b>각 질문당 최대 5분</b>동안 답변할 수 있으며</p>
            <p style={{margin: '0'}}>시간이 초과될 시 자동으로 녹화가 종료됩니다.</p>
          </div>
          <div className="container">
            <div className="row my-3">
              <input
                type="text"
                onChange={(event) => {setTitle(event.target.value)}}
                value={title}
                name="title"
                className={
                  "form-control shadow-none"
                }
                placeholder="면접 제목"
                autocomplete="off"
              />
              <div className="invalid-feedback">{titleInvalidFeedback}</div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xl-13 questions">
                {questions.map((data, index) => {
                  const { question } = data;
                  return (
                    <div className="row my-3" key={index}>
                      <div className="col-11">
                        <div className="form-group">
                          <input
                            type="text"
                            onChange={(event) => handleChange(index, event)}
                            value={question}
                            name="question"
                            className={
                              "form-control shadow-none"
                            }
                            placeholder="질문"
                            autocomplete="off"
                          />
                          <div className="invalid-feedback">
                            {questionInvalidFeedback}
                          </div>
                        </div>
                      </div>
                      <div className="col-1">
                        {questions.length !== 1 ? (
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => removeInputFields(index)}
                          >
                            x
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col-xl-4">
                    {questions.length < 5 ? (
                      <button
                        className="btn btn-sm btn-light"
                        onClick={addInputField}
                      >
                        질문 추가
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <fieldset style={{textAlign: "center"}}>
            <legend style={{fontSize: '1.2rem'}}>피드백 목소리 선택</legend>
            <div style={{display: 'flex'}}>
              <input type="radio" id="nkitae" name="speaker" value="nkitae" checked />
              <label for="nkitae" style={{margin: '1rem'}}>기태</label>
              <audio controls src="/sounds/nkitae.mp3" />
            </div>
            <div style={{display: 'flex'}}>
              <input type="radio" id="nyuna" name="speaker" value="nyuna" />
              <label for="nyuna" style={{margin: '1rem'}}>유나</label>
              <audio controls src="/sounds/nyuna.mp3" />
            </div>
          </fieldset>
          <Button onClick={handleStart}>면접 시작하기</Button>
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
  height: 100%;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem;
`;

const Button = styled.button`
  box-sizing: border-box;
  position: fixed;
  top: 90%;
  background: #6754cb;
  color: white;
  width: 350px;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 50px;
  font-family: Pretendard;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #4B3C93;
    transition: 0.3s;
  }
`;

export default InterviewInfo;
