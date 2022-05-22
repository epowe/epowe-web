import "./App.css";
import MainPage from "./views/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      asdfadsf
      <Routes>
        <Route path="/M" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
