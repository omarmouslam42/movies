import React, { useContext } from 'react'
import { useState } from 'react';
import Joi from 'joi'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { ApiContext } from '../../context/UserContext';

export default function Login() {

  const {getTkn} = useContext(ApiContext);
  const navigate =  useNavigate()
  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const [errores, setErrores] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [iconClick, setIconClick] = useState(true);

 



  function getUser(e){
    setApiMessage("")
    let newUser ={...user};
    let userValue = e.target.value;
    newUser[e.target.id]= userValue;
    setUser(newUser);
  }


  async function userApi() {
    let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signin`,user)
    // console.log(data.message);

    if (data.message == "success") {
      // go home
      // console.log("done");
      //navigate
      localStorage.setItem("tkn",data.token )
      getTkn();
      // console.log(data.token);
      navigate("/home")
    }
    else{
      setApiMessage(data.message);
    }
    setIconClick(true)
  }


  function submitUser(e){
   setIconClick(false)
    e.preventDefault();

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*/]{3,30}$')),
  })

  let validate = schema.validate(user , {abortEarly : false});
  if (validate.error == undefined) {
    //call api
    userApi()
  }
  else{
    setErrores(validate.error.details)
    // console.log(validate.error.details);
    setIconClick(true)
  }
  }
  

  function sendKey(key) {
    if (errores.length != 0) {
      for (let i= 0; i < errores.length; i++) {
        if (errores[i].context.key == key) {
          return errores[i].message
        }
      }
    } 
  }



  return <>
 
  <div className= 'reg container py-5 mt-5 w-50'>
   <form onSubmit={submitUser}>
    <h3 className='my-3'>Sign In </h3>

    <div className='mb-3'>
    <label htmlFor="email">Email</label>
    <input onChange={getUser} id='email' type="email" className='form-control form-control-lg shadow-none border-0' placeholder='your email' />
    { sendKey("email")? <div className='text-danger mb-3 mt-2'><i className="fa-solid fa-circle-xmark text-danger"></i>  your email is incorrect</div> :"" }
    </div>

    <div className='mb-3'>
    <label htmlFor="password">Password</label>
    <input onChange={getUser} id='password' type="password" className='form-control form-control-lg shadow-none border-0 'placeholder='your password'  />
    { sendKey("password")? <div className='text-danger mt-2'><i className="fa-solid fa-circle-xmark text-danger"></i>   your password is incorrect </div> :"" }  
    </div>
    
    <div className=' d-flex'>
    <button className='btn btn-outline-info  fw-semibold' type='submit'>
      {iconClick ==true?"signin":<i className="fa-solid fa-spinner fa-spin text-white"></i>}
      </button>
    {apiMessage.length !=0 ? <div className='text-danger ms-3'>{apiMessage}</div> :""}
    </div>
    
   </form>
  </div>
  </>
}
