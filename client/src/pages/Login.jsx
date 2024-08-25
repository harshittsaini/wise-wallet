import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
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

    //login API integration
    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });

      // Assuming the API returns a token on successful login
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccess("Login successful!");
        // Redirect to another page
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the login page after a short delay
        }, 1000); // Redirect to the dashboard or another page
      } else {
        setPasswordError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setPasswordError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
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
      {success && (
        <p style={{ color: "green" }} className="m-2 font-semibold">
          {success}
        </p>
      )}
      <div className={"inputContainer"}>
        <button className={"inputButton"} type="submit">
          Log in
        </button>
      </div>
      <p className="text-sm text-center mt-4">
        Not registered yet?{" "}
        <Link to={"/signup"} className="underline">
          Create an Account
        </Link>
      </p>
    </form>
  );
};

export default Login;
