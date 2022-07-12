import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import MainPage from "./views/MainPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InterviewInfo from "./views/InterviewInfo.jsx";
import Feedback from "./views/Feedback";
import MyFeedback from "./views/MyFeedback";
import FeedbackList from "./views/FeedbackList";
import QuestionList from "./views/QuestionList";
import FeedbackDetail from "./views/FeedbackDetail";

function App() {
  const BASE_URL = ApiBaseURL;
  // axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = false;
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true" ? true : false
  );
  const value = {
    isLogged,
    setIsLogged,
  };
  async function getData(data) {
    try {
      //응답 성공
      const response = await axios.get(
        "http://localhost:3000/oauth2/redirect",
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Okay");
      }
      console.log(response);
      console.log("응답 성공");
    } catch (error) {
      //응답 실패

      console.error(error);
      console.log("응답 실패");
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/oauth2/redirect" element={<Register />} />
      <Route path="/interview/info" element={<InterviewInfo />} />
      <Route path="/interview/feedback" element={<Feedback />} />
      <Route path="/myfeedback" element={<MyFeedback />} />
      <Route path="/feedbacklist" element={<FeedbackList />} />
      <Route path="/questionlist" element={<QuestionList />} />
      <Route path="/feedbackDetail" element={<FeedbackDetail />} />
    </Routes>
  );
}

export default App;
