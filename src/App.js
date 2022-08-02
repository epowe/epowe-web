import "./App.css";
import React, { useEffect, useState } from "react";
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
import { removeCookieToken } from "./Auth";
const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  // 토큰 만료일 계산해주는 함수
  const isTokenExpired = (token) => {
    var decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  };

  // 새로운 토큰 재발급 함수
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
    if (window.location.pathname === "/") {
      localStorage.clear();
      removeCookieToken();
      console.log("로그인 페이지로 와서 localStorage와 쿠키 사라짐");
    }
    if (localStorage.getItem("accessToken")) {
      console.log("accessToken이 로컬에 저장되었습니다.");
      console.log("refreshToken이 로컬에 저장되었습니다.");
      var accessToken = localStorage.getItem("accessToken");
      var refreshToken = localStorage.getItem("refreshToken");
      console.log("localStorage에 저장한 access 토큰은??????" + accessToken);
      console.log("localStorage에 저장한 refresh 토큰은?????" + refreshToken);
      if (localStorage.getItem("isLogged")) {
        setIsLogged(true);
        console.log("login이 localstorage에 저장되었습니다.");
        console.log(isLogged);
        isTokenExpired(accessToken);
      }
    } else {
      console.log("JWT 발급 실패");
    }
  }, []);

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
        element={
          !isLogged ? (
            <Navigate replace to="/" />
          ) : localStorage.getItem("address") === false ? (
            <Interview />
          ) : (
            <Register />
          )
        }
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
