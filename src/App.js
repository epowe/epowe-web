import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import MainPage from "./views/MainPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InterviewInfo from "./views/InterviewInfo.jsx";
import Feedback from "./views/Feedback";
import AppContext from "./AppContext";
import axios from "axios";
import ApiBaseURL from "./ApiBaseURL";
import API from "./API";
import Oauth2RedirectURL from "./Oauth2RedirectURI";

function App() {
  const BASE_URL = ApiBaseURL;
  // axios.defaults.baseURL = BASE_URL;
  console.log(axios.defaults.baseURL);
  axios.defaults.withCredentials = false;
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true" ? true : false
  );
  const value = {
    isLogged,
    setIsLogged,
  };

  const authLogin = async () => {
    try {
      //응답 성공
      axios
        .get("http://localhost:3000/oauth2/redirect", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      //응답 실패
      console.error(error);
      console.log("응답 실패glalalal");
    }
  };
  useEffect(() => {
    authLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/oauth2/redirect" element={<Register />} />
      <Route path="/interview/info" element={<InterviewInfo />} />
      <Route path="/interview/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
