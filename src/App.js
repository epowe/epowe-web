import "./App.css";
import MainPage from "./views/MainPage";
import Interview from "./views/Interview";
import Register  from './views/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InterviewInfo from './views/InterviewInfo';
import Feedback from './views/Feedback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/register" element={<Register />} />
      <Route path="/interview/info" element={<InterviewInfo />} />
      <Route path="/interview/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
