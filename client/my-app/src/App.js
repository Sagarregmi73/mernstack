import "./App.css";
import Register from "./component/register";
import Login from "./component/login";
import Home from "./component/home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home/:id" element={<Home />} />
          <Route path="signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
