import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
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

    const { fullname, email, password, cpassword } = user;
    const result = await fetch("http://localhost:4000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        password,
        cpassword,
      }),
    });
    setUser({ fullname: "", email: "", password: "", cpassword: "" });

    const data = await result.json();

    if (data.fullname || data.email || data.password || data.cpassword) {
      localStorage.setItem("userItem", JSON.stringify(data));
      Navigate("/");
    } else {
      alert("please fill the form correctly");
    }
  };

  return (
    <div className="container">
      <h1 className="top-text">Register</h1>
      <label htmlFor="name" className="label-text">
        Full Name:
        <input
          className="input-box"
          type="text"
          placeholder="Full Name"
          name="fullname"
          id="fullname"
          value={user.fullname}
          onChange={handleChange}
        />
      </label>

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

      <label htmlFor="cpassword" className="label-text">
        Confirm Password:
        <input
          className="input-box"
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          id="cpassword"
          value={user.cpassword}
          onChange={handleChange}
        />{" "}
      </label>
      <button onClick={handleSubmit} className="s-button">
        Submit
      </button>
      <span>
        <Link to="/">Sign In</Link>
      </span>
    </div>
  );
};

export default Register;
