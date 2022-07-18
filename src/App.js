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
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true" ? true : false
  );
  const value = {
    isLogged,
    setIsLogged,
  };
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userProfile, setUserProfile] = useState("");

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
  }, [userAddress]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/oauth2/redirect"
        element={!isLogged ? <Navigate replace to="/" /> : <TokenProcess />}
      />
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
