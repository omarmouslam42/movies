import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import $ from"jquery"
import { ApiContext } from '../../context/UserContext';
export default function Nav() {
 

  const {loggedInUser , removeData, getTkn ,movies} = useContext(ApiContext);
  const navigate = useNavigate()



function logout() {
 let ask= window.confirm("Are you sure to logout?")
 if (ask) {
  navigate("/login")
  removeData();}
}
function checkReload() {
  if (localStorage.getItem('tkn') !=null && loggedInUser ==null) {
      //el user 3ml reload
      getTkn(); }}

let navHeight= $("nav").outerHeight();
let homeOffset= $('.home').offset()?$('.home').offset().top:""
  // console.log(homeOffset);

useEffect(() => {
  checkReload();


  $(window).scroll(()=>{

    if ($(window).scrollTop() > homeOffset ) {
      $('nav').css("background", "linear-gradient(to bottom , rgba(1, 1, 9, 0.989),rgba(15, 15, 69))")
     }
     else{
        $('nav').css("background",'transparent')
     }

  })
},[]);



  return <>

   <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100 ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home"> <div><h2 className='m-3'>Movie<span className='text-danger'>d</span><span className='text-info'>b</span></h2></div></Link>
    {loggedInUser!= null?  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>:""}
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {loggedInUser != null?  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link fs-5" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-5 mx-3"to="/movies">Movies</Link>
        </li>
        <li className="nav-item fs-5">
          <Link className="nav-link" to="/tvshows">TVshows</Link>
        </li>
      </ul>
        :""}
      {loggedInUser ==null?
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fs-6 text-danger" aria-current="page" to="/Reg">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fs-6 text-info" aria-current="page" to="/Login">Sign In</Link>
        </li>
       
      </ul>:""}


        {loggedInUser !=null?  <form className="d-flex" role="search">
        <input  className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-danger" type="submit">Search</button>
      </form>:""}
       {loggedInUser!=null?<ul>
        <li className="nav-item fs-5 me-2">
          <Link onClick={logout} className="nav-link me-0" >LogOut</Link>
        </li>
        </ul>:""}
      
      
    </div>
  </div>
</nav>
   

  <Outlet/>
  {loggedInUser !=null?<footer className=' bg-black py-3 d-flex justify-content-center align-items-center flex-column  end-0'>
  <p className='text-muted'>Lorem ipsum, dolor sit amet consectetur . Deleniti fuga aperiam minus molestiae eius, ipsam ratione illo dolore quis in at consequatur neque!</p>
  <div>
  <i className="fa-brands fa-facebook-f text-danger bg-white p-2 rounded-circle"></i>
  <i className="fa-brands fa-twitter text-danger mx-3 bg-white p-2 rounded-circle"></i>
  <i className="fa-brands fa-linkedin-in text-danger bg-white p-2 rounded-circle"></i>
  <i className="fa-brands fa-google-plus-g text-danger bg-white ms-3 p-2 rounded-circle"></i>
  </div>
  </footer>:""}
  
  </>
}
