import React from 'react'
import { useState } from 'react';
import Joi from 'joi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Reg() {

 const navigate =  useNavigate()
  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    age:"",
    email:"",
    password:"",
  });
  const [errores, setErrores] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [alreadyReg, setAlreadyReg] = useState("");

 



  function getUser(e){
    let newUser ={...user};
    let userValue = e.target.value;
    newUser[e.target.id]= userValue;
    setUser(newUser);
  }


  async function userApi() {
    let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signup`,user)
    console.log(data.message);

    if (data.message == "success") {
      // go home
      console.log("done");
     
      //navigate
      navigate("/home")
    }
    else if( data.message == "citizen validation failed: email: email already registered"){
      setAlreadyReg(data.message)
    }
    else{
      setApiMessage(data.message);
    }
  }


  function submitUser(e){
   
    e.preventDefault();

  const schema = Joi.object({

    first_name: Joi.string().alphanum().min(3).max(20).required(),
    last_name: Joi.string().alphanum().min(3).max(20).required(),
    age: Joi.number().min(18).max(60).required(),
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
    console.log(validate.error.details);
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
  <div><h2 className='m-3'>Movie<span className='text-danger'>d</span><span className='text-info'>b</span></h2></div>
  <div className= 'reg container py-5 w-50'>
   <form onSubmit={submitUser}>
    <h3 className='my-3'>Registeration Form</h3>
    <div className='mb-3'>
    <label htmlFor="first_name">firstName</label>
    <input onChange={getUser} id='first_name' type="text" className='form-control  form-control-lg shadow-none border-0' placeholder='first-name' />
    { sendKey("first_name")? <div className='text-danger mb-3 mt-2'><i className="fa-solid fa-circle-xmark text-danger"></i>  your FirstName is incorrect </div> :"" }
    </div>

    <div className='mb-3'>
    <label htmlFor="last_name">LastName</label>
    <input onChange={getUser} id='last_name' type="text" className='form-control form-control-lg shadow-none border-0' placeholder='last-name' />
    { sendKey("last_name")? <div className='text-danger mb-3 mt-2'><i className="fa-solid fa-circle-xmark text-danger"></i>  your LastName is incorrect</div> :"" }
    </div>
    
    <div className='mb-3'>
    <label htmlFor="age">Age</label>
    <input onChange={getUser} id='age' type="number" className='form-control form-control-lg shadow-none border-0' placeholder='age' />
    { sendKey("age")? <div className='text-danger mb-3 mt-2'><i className="fa-solid fa-circle-xmark text-danger"></i>  your age must be between 18 and 60 years</div> :"" }
    </div>

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
    {apiMessage.length !=0 ? <div className='text-success'>Register</div> :""}
    <div className=' d-flex'>
    <button className='btn btn-outline-info  fw-semibold' type='submit'>Register</button>
    {alreadyReg.length !=0 ? <div className='text-danger ms-2 fs-5'>email already registered</div> :""}
    </div>
   </form>
  </div>
  
  </>
}
