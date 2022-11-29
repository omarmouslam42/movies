import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import $ from"jquery"
export default function Nav() {
 

function clickEvent(){
  const navWidth = $(".Nav").innerWidth();
  $(".Nav").css("right",-navWidth)
  $('.fa-bars').click(()=>{
    if($(".Nav").css("right") =="0px"){
    $(".Nav").animate({right: -navWidth}, 1000 );
    }
    else{
    $(".Nav").animate({right: 0}, 1000 );
    }
  })
  $(".fa-xmark").click(()=>{
    $(".Nav").animate({right: -navWidth}, 1000 );
  })
}

useEffect(() => {
  clickEvent()
});


  return <>
   <div className='Nav vh-100 '>

     <div><i className="fa-solid fa-xmark m-3 fs-4 "></i></div>
        <h1 className='text-center'>Moviedb</h1>
    <ul className='mt-5 ms-2 nav-link p-3'>
      <li className=' mt-1 fs-5'><Link to="/home">Home</Link></li>
      <li className=' mt-4 fs-5'><Link to="/reg">Sign Up</Link></li>
      <li className=' mt-4 fs-5'><Link to="/login">Sign In</Link></li>
      {/* <li className=' mt-4 fs-5'><Link to="/about">LogOut</Link></li> */}
      <li className="nav-item dropdown mt-4 fs-5">
          <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="">Movies</Link></li>
            <li><Link className="dropdown-item" to="">Tv Shows</Link></li>
            
          </ul>
        </li>
    </ul>

  <div> <i  className="fa-solid fa-bars p-2 fa-2x "></i></div>

   </div>




  <Outlet/>
  </>
}
