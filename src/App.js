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
import { removeCookieToken, getCookieToken } from "./Auth";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContext from "./AppContext";
const queryClient = new QueryClient();

const App = () => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged")
      ? localStorage.getItem("isLogged") === "true"
        ? true
        : false
      : false
  );
  const [addressExist, setAddressExist] = useState(false);
  const value = {
    isLogged,
    setIsLogged,
    addressExist,
    setAddressExist,
  };
  // 토큰 만료일 계산해주는 함수
  const isTokenExpired = (token) => {
    var decoded = jwt_decode(token);
    if (decoded.exp < Date.now() * 1000) {
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
      console.log("새로 발급 받은 리프레쉬 토큰은????" + result.refreshToken);
      console.log("새로 발급 받은 엑세스 토큰은????" + result.accessToken);
    } else {
      console.log("서버에 만료된 토큰 전송 실패.");
      console.log(result);
    }
  };

  useEffect(() => {
    // if (window.location.pathname === "/") {
    //   localStorage.clear();
    //   removeCookieToken();
    //   console.log("로그인 페이지로 와서 localStorage와 쿠키 사라짐");
    // }
    if (localStorage.getItem("isLogged")) {
      console.log("jwt 발급 완료");
      console.log("addressExist: " + addressExist);
      if (localStorage.getItem("address") === true) {
        setAddressExist(true);
        console.log("주소 존재한다.");
      }
    } else {
      console.log("JWT 발급 실패");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={value}>
        <Routes>
          <Route
            path="/"
            element={
              !isLogged ? (
                <LoginPage />
              ) : !addressExist ? (
                <Navigate replace to="/register" />
              ) : (
                <Navigate replace to="/interview" />
              )
            }
          />
          <Route path="/oauth2/redirect" element={<TokenProcess />} />
          <Route
            path="/register"
            element={!isLogged ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="/interview"
            element={!isLogged ? <Navigate replace to="/" /> : <Interview />}
          />
          <Route
            path="/interview/info"
            element={
              !isLogged ? <Navigate replace to="/" /> : <InterviewInfo />
            }
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
            element={
              !isLogged ? <Navigate replace to="/" /> : <FeedbackDetail />
            }
          />
          {/* 비디오 레코드 테스트 페이지 */}
          <Route path="/videotest" element={<VideoRecordTest />} />
        </Routes>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
