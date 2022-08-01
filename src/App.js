import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import LoginPage from "./views/LoginPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InterviewInfo from "./views/InterviewInfo.jsx";
import MyFeedback from "./views/MyFeedback";
import FeedbackList from "./views/FeedbackList";
import QuestionList from "./views/QuestionList";
import FeedbackDetail from "./views/FeedbackDetail.jsx";
import VideoRecordTest from "./views/VideoRecordTest.jsx";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
import { TokenProcess } from "./TokenProcess";
import jwt_decode from "jwt-decode";
import { API } from "./API";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  // const [userAddress, setUserAddress] = useState("");

  const convertDate = (milliSecond) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const data = new Date(milliSecond); //Date객체 생성

    const year = data.getFullYear(); //0000년 가져오기
    const month = data.getMonth() + 1; //월은 0부터 시작하니 +1하기
    const date = data.getDate(); //일자 가져오기
    const day = days[data.getDay()]; //요일 가져오기

    return `${year}.${month}.${date}. (${day})`;
  };
  const isTokenExpired = (token) => {
    var decoded = jwt_decode(token);
    console.log("만료일 밀리세컨드 표시: " + decoded.exp);
    const today = new Date();
    const newdate = new Date(decoded.exp);
    const extendTime = today.setDate(today.getDate() + newdate);
    // var newdate = new Date(extendTime);
    console.log("연장된 날짜: " + Date.now());
    console.log("지금 날짜: " + today);
  };

  const getNewAccess = async () => {
    var result = await API.getAccessUsingRefresh({
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    });
    if (result) {
      console.log("서버에 만료된 토큰 전송 완료.");
      console.log(result);
      console.log("새로발급받은 리프레쉬 토큰은????" + result.refreshToken);
      console.log("새로발급받은 엑세스 토큰은????" + result.accessToken);
    } else {
      console.log("서버에 만료된 토큰 전송 실패.");
      console.log(result);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("accessToken")
      // && localStorage.getItem("refreshToken")
    ) {
      console.log("accessToken이 로컬에 저장되었습니다.");
      console.log("refreshToken이 로컬에 저장되었습니다.");
      var accessToken = localStorage.getItem("accessToken");
      var refreshToken = localStorage.getItem("refreshToken");
      console.log("localStorage에 저장한 access 토큰은??????" + accessToken);
      console.log("localStorage에 저장한 refresh 토큰은?????" + refreshToken);
      // getNewAccess();
      isTokenExpired(accessToken);
      if (localStorage.getItem("isLogged")) {
        setIsLogged(true);
        console.log("login이 localstorage에 저장되었습니다.");
        isTokenExpired(accessToken);
      }
    } else {
      console.log("JWT 발급 실패");
    }
  }, [isLogged]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/oauth2/redirect" element={<TokenProcess />} />
      <Route
        path="/interview"
        element={!isLogged ? <Navigate replace to="/" /> : <Interview />}
      />
      <Route
        path="/register"
        element={!isLogged ? <Navigate replace to="/" /> : <Register />}
      />
      <Route
        path="/interview/info"
        element={!isLogged ? <Navigate replace to="/" /> : <InterviewInfo />}
      />
      <Route
        path="/interview/feedback"
        element={!isLogged ? <Navigate replace to="/" /> : <TokenProcess />}
      />
      <Route
        path="/feedback"
        element={!isLogged ? <Navigate replace to="/" /> : <MyFeedback />}
      />
      <Route
        path="/feedback/list"
        element={!isLogged ? <Navigate replace to="/" /> : <FeedbackList />}
      />
      <Route
        path="/feedback/list/questions"
        element={!isLogged ? <Navigate replace to="/" /> : <QuestionList />}
      />
      <Route
        path="/feedback/list/questions/detail"
        element={!isLogged ? <Navigate replace to="/" /> : <FeedbackDetail />}
      />
      {/* 비디오 레코드 테스트 페이지 */}
      <Route path="/videotest" element={<VideoRecordTest />} />
    </Routes>
  );
};

export default App;
