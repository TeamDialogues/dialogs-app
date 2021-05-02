import "./App.css";
// eslint-disable-next-line no-unused-vars
import { Routes, Route } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Home } from "./home/Home";
import { PrivateRoutes } from "./Auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoutes path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
