import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import MainPage from "./views/MainPage.jsx";
import Interview from "./views/Interview";
import Register from "./views/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InterviewInfo from "./views/InterviewInfo.jsx";
import Feedback from "./views/Feedback";

function App() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true" ? true : false
  );
  const value = {
    isLogged,
    setIsLogged,
  };

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
