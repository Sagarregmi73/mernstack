import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.email, user.password);
    const { email, password } = user;
    const result = await fetch("http://localhost:4000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setUser({ email: "", password: "" });
    const data = await result.json();

    if (data.fullname) {
      localStorage.setItem("user", JSON.stringify(data));
      Navigate(`/home/${data._id}`);
    } else {
      alert("please enter correct detail");
    }
  };

  return (
    <div className="container">
      <h1 className="top-text">Login</h1>

      <label htmlFor="email" className="label-text">
        Email:
        <input
          className="input-box"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="label-text">
        Password:
        <input
          className="input-box"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleSubmit} className="s-button">
        Submit
      </button>
      <span>
        <Link to="/signup">Sign Up</Link>
      </span>
    </div>
  );
};

export default Login;
