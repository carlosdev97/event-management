import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { UserEvents } from "./pages/UserEvents/UserEvents";
import { FormAddEvent } from "./pages/FormAddEvent/FormAddEvent";
import { FormEditEvent } from "./pages/FormEditEvent/FormEditEvent";
import { Footer } from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{ duration: 5000 }}
        position="bottom-right"
        reverseOrder={false}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-events" element={<UserEvents />} />
        <Route path="/user-events/add" element={<FormAddEvent />} />
        <Route path="/user-events/edit/:eventId" element={<FormEditEvent />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
