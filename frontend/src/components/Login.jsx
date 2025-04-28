import axios from 'axios'
import React, { useState } from 'react'
import "./Login.css"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        try{
            const result = await axios.post("http://localhost:3000/api/v1/login", {
                email: email,
                password: password
            });
            console.log(result.data.token)
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <div className='login-container'>
      {/* Here we will allow the user to login using the email and  password that they used while registring*/}
        <input 
            placeholder='Enter Registered Email' 
            type='text'
            value={email} 
            onChange={handleEmail}>     
        </input>

        <input 
            placeholder='Enter Password' 
            type='password'
            value={[password]} 
            onChange={handlePassword}>
        </input>

        {/* Add a buton using which loggin happen */}
        <button onClick={handleLogin}>Login</button>

        <a href="/register" >Register Here </a>
    </div>
  )
}

export default Login
