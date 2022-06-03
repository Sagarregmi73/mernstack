import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Home = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/");
    }
    userPortfolio();
  }, []);

  const userPortfolio = async () => {
    const result = await fetch(`http://localhost:4000/users/${id}`);
    const data = await result.json();
    setUser(data);
  };

  const logoutHandle = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="top-text">Welcome to MernStack</h1>
      <h1 className="middle-text">
        congratulation <span className="decore-user">{user.fullname} </span>
      </h1>
      <h3 className="middle-text">
        Your email id is <span className="decore-user">{user.email}</span>{" "}
      </h3>
      <button className="logout-button" onClick={logoutHandle}>
        Logout
      </button>
    </div>
  );
};

export default Home;
