import "./App.css";
import React, { useEffect, useState } from "react";
import LoginPage from "./views/LoginPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InterviewInfo from "./views/InterviewInfo.jsx";
import Feedback from "./views/Feedback";
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
import {
  removeCookieToken,
  getCookieToken,
  setRefreshTokenToCookie,
} from "./Auth";
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
  const [addressExist, setAddressExist] = useState(
    localStorage.getItem("address")
      ? localStorage.getItem("address") === "true"
        ? true
        : false
      : false
  );
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const value = {
    isLogged,
    setIsLogged,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userProfile,
    setUserProfile,
  };

  useEffect(() => {
    // if (window.location.pathname === "/") {
    //   localStorage.clear();
    //   removeCookieToken();
    //   console.log("로그인 페이지로 와서 localStorage와 쿠키 사라짐");
    // }
    //웹 내 cookie refresh token 확인
    var accessToken = localStorage.getItem("accessToken");
    var refreshToken = getCookieToken();
    console.log("리프레쉬 토큰은:???:", refreshToken);
    if (!accessToken) return;
    if (!isTokenExpired(accessToken)) {
      getUserInfo();
      console.log("accessToken 유효");
    } else {
      console.log("accssToken 만료");

      if (refreshToken && !isTokenExpired(refreshToken)) {
        console.log("refreshToken 유효");
        console.log(
          "엑세스 토큰이 만료되어 새로운 엑세스 토큰과 리프레쉬 토큰을 재발급합니다."
        );
        getNewAccess({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        console.log("refreshToken 만료");
        console.log("엑세스 토큰과 리프레쉬 토큰이 만료되어 재 로그인 합니다.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("address");
        setIsLogged(false);
        removeCookieToken();
      }
    }
  }, []);

  //유저 정보 가져오는 함수
  const getUserInfo = async () => {
    var result = await API.authAfterLogin();
    if (result) {
      console.log("사용자 데이터 잘 들어옴");
      setUserEmail(result.email);
      setUserProfile(result.picture);
      setUserName(result.username);
    } else {
      console.log("사용자 데이터 잘 들어오지 않음");
    }
  };
  // 새로운 토큰 재발급 함수
  const getNewAccess = async ({ accessToken, refreshToken }) => {
    console.log("엑세스: " + accessToken);
    console.log("리프레쉬 : " + refreshToken);
    var result = await API.getAccessUsingRefresh({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    if (result) {
      console.log("서버에 만료된 토큰 전송 완료.");
      console.log(result);
      console.log("새로 발급 받은 리프레쉬 토큰은????" + result.refreshToken);
      console.log("새로 발급 받은 엑세스 토큰은????" + result.accessToken);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("isLogged", true);
      setRefreshTokenToCookie(result.refreshToken);
      getUserInfo();
    } else {
      console.log("서버에 만료된 토큰 전송 실패.");
      console.log(result);
    }
  };
  // 토큰 만료일 계산해주는 함수
  const isTokenExpired = (token) => {
    var decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return true;
    } else {
      return false;
    }
  };

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
            element={
              !isLogged ? (
                <Navigate replace to="/" />
              ) : !addressExist ? (
                <Register />
              ) : (
                <Navigate replace to="/interview" />
              )
            }
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
            element={!isLogged ? <Navigate replace to="/" /> : <Feedback />}
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
//테스트

export default App;
