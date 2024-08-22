import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../utils/axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    // You'll update this function later...
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === name) {
      setNameError("Please enter your name");
      return;
    }

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 3) {
      setPasswordError("The password must be 3 characters or longer");
      return;
    }

    //handle signup integration
    try {
      const response = await axios.post("/users/signup", {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page after a short delay
        }, 1500);
      } else {
        setPasswordError("Signup failed");
      }
    } catch (err) {
      setPasswordError("User already Exists!!");
      setSuccess("");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSignup} className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Signup</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(ev) => setName(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      {success && <p style={{ color: "green" }} className="m-2 font-semibold">{success}</p>}
      <div className={"inputContainer"}>
        <button className={"inputButton"} type="submit">
          Create Account
        </button>
      </div>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to={"/login"} className="underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
