import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
