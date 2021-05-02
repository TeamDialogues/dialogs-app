import "./App.css";
// eslint-disable-next-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Home } from "./home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
