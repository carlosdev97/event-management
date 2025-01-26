import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
