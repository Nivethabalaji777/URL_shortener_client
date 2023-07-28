import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [passShow, setPassShow] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(signInData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/signin", signInData);

      if (!data) return toast.error("Invalid Input", { theme: "colored" });

      localStorage.setItem("token", data.data);
      setMsg(data.message);
      navigate("/home");
    } catch (error) {
      const notify = () =>
        toast.error(`${error.response.data.message}`, { theme: "colored" });
      notify();
    }
  };
  
  console.log(msg);

  return (
    <>
      <Header />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="login-content">
          {msg && <p className="alert alert-success">{msg}</p>}
            <h4 className="title-login">LOGIN</h4>

            <TextField
              placeholder="Email"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              placeholder="Password"
              name="password"
              type={!passShow ? "password" : "text"}
              variant="outlined"
              margin="normal"
              onChange={handleChange}
            />
            <div className="login-submit-button">
              <Button type="submit" variant="contained" style={{backgroundColor: "#009b9b"}}>
                Login
              </Button>
            </div>
            <div className="login-footer">
              <a href="/forget" className="login-forget">
                <u>Forget Password?</u>
              </a>
              <ToastContainer autoClose={3000} theme="colored" />
              <p className="login-signup-para">
                You don't have account,&nbsp;
                <span>
                  <a href="/signup" className="login-forget">
                    create new account
                  </a>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
