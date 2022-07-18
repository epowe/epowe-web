import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import MainPage from "./views/MainPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register";
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
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
import { TokenProcess } from "./TokenProcess";
import { API } from "./API";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  //백에서 전달받은 데이터 중 주소 데이터의 유무를 판별하는 함수
  const getUserAddress = async () => {
    var result = await API.authAfterLogin();
    if (result) {
      setUserAddress(result.address);
    } else {
      console.log("사용자 데이터 잘 들어오지 않음");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      if (localStorage.getItem("isLogged")) {
        setIsLogged(true);
        console.log("login이 localstorage에 저장되옸습니다.");
      }
      getUserAddress();
      if (userAddress) {
        console.log("userAddress 존재");
        console.log(userAddress);
        localStorage.setItem("existingUser", true);
      } else {
        console.log("address 존재하지 않음");
        localStorage.setItem("existingUser", false);
        console.log(localStorage.getItem("existingUser") + "ddd");
      }
    } else {
      console.log("JWT 발급 실패");
    }
  }, [userAddress, isLogged]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
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
    </Routes>
  );
};

export default App;
