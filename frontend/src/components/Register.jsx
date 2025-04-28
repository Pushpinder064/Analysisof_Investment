import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const naviagte = useNavigate();

    // Write function to update ans tore the email
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    // here take the values from the user and send it to the server to store in the databse
    async function handleRegister() {
        try{
            //bEFORE SENDING THE DATA TO THE SERVER check wehther password and confirm password are same or not
            if(password != confirmPassword){
                // show alert before throwing error
                // alert("Confirm password and password are not same")
                throw "confirm password and actual password does not match";
            }
            const res = await axios.post("http://localhost:3000/api/v1/register", {
                email : email,
                password: password
            });
            // if the data is send successfully, take user to login page so the token can be generate
            naviagte("/login");
        }
        catch(err){
            console.log("Error while sending data to the Server: " + err);
        }
    }

    // Write function to get values of the password and confirm password
    const hanlderPassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

  return (
    <div className='container'>
        <div className='register-container'>
        <input placeholder='Enter your email' type="text" value={email} onChange={handleEmail}/>
        <input placeholder='Enter Password' type="password" value={password} onChange={hanlderPassword}/>

        <input placeholder='Confirm Password' type="password" value={confirmPassword} onChange={handleConfirmPassword}/>

        <button onClick={handleRegister}>Register In</button>

        <a href="/login">Already registered? Log in here</a>
        </div>
    </div>
  )
}

export default Register;
