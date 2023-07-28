import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post("/api/password-reset", { email });
      setMsg(data.message);
    } catch (error) {
      setError(error.response.data.message);
      return toast.error(error, { theme: "colored" });
    }
  }

  return (
    <>
      <Header />
      <div className="forget-container">
        <form onSubmit={handleSubmit}>
          <div className="forget-content">
            <h4 className="forget-title">Forget Password</h4>
            <TextField
              placeholder="Enter Valid Email"
              type="email"
              variant="outlined"
              margin="normal"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="forget-footer">
              {error && <p className="alert alert-danger">{error}</p>}
              {msg && <p className="alert alert-success">{msg}</p>}
              <ToastContainer autoClose={3000} theme="colored" />
              <Button variant="contained" type="submit" style={{backgroundColor: "#009b9b"}}>
                Send Mail
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Forget;
