import "./App.css";
import MainPage from "./views/MainPage";
import Interview from "./views/Interview";
import Register  from './views/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
