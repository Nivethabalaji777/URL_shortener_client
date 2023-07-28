import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Header from '../Components/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [passShow, setPassShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async(e) =>{
     e.preventDefault();
     try {
      if (name && email && password) {
        await axios.post('/api/signup', {
            name: name,
            email: email,
            password: password
          })
          .then(res => {
            if (res) {
              setError(res.data.message);
              setTimeout(() => {
                navigate('/')
              }, 2000)
            }
          })
          .catch(error => {
            const notify = () =>
              toast.error(`*${error.response.data.message}*`, {
                theme: 'colored'
              })
            notify()
          })
        }else{
          const notify = ()=>{
            toast.error("Invalid input",{theme:"colored"})
          }
          notify()
        }
     
     } catch (error) {
      const notify = ()=>{
        toast.error("Invalid input",{theme:"colored"})
      }
      notify()
       console.log(error);
     }
  }
  
  return (
    <>
    <Header/>
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-content">
        {error && <p className='alert alert-success'>{error}</p>}
          <h5 className="title-signup">Create new account</h5>

          <TextField
            placeholder="Full Name"
            name="name"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={(e)=>setName(e.target.value)}
          />

          <TextField
            placeholder="Enter Your Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            placeholder="Password"
            name="password"
            type={!passShow ? "password" : "text"}
            variant="outlined"
            margin="normal"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div className="signup-submit-button">
            <Button type="submit" variant="contained" style={{backgroundColor: "#009b9b"}}>
              Submit
            </Button>
          </div>
         <div>
        <ToastContainer hideProgressBar={true}/>
         </div>
          <div className="signup-footer">
            <p>If you have account, Go to<a href="/" className="signup-forget">
              <u>Login page</u>
            </a></p>
          </div>
        </div>
      </form>
    </div>
 </> )
}

export default Signup