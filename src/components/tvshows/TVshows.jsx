import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from '../../context/UserContext';

export default function TVshows() {

    const {tvshows} = useContext(ApiContext);

  return <>
  { tvshows?<div className='container py-5 mt-5'>
 
  <div className='mt-4'>
    <h2>All TV Shows</h2>
  </div>
  <div className='row py-5'>
    {tvshows.map((tv , idx)=>
       <div key={idx} className='col-lg-2 col-md-3'>
        <Link to={`/MovieDetails/${tv.media_type}/${tv.id}`}>
        <div className= "movie position-relative ">
       <img src={"https://image.tmdb.org/t/p/w500"+ tv.poster_path} alt="movie poster" className='w-100' />
       <div className='hoverscreen '>
     
      <h6 className='mt-4'>{tv.name}</h6>
      <h6 >Rate: {tv.vote_average}</h6>
       </div>
      </div>
        </Link>
      
      <h6 className='mb-3 mt-1 text-center'>{tv.name}</h6>
       </div> )}
    
   
    </div>


  
 </div>:<div className='loadingscreen vh-100 d-flex justify-content-center align-items-center'>
    <i className='fa-solid fa-spinner fa-spin text-white fa-4x'></i>
  </div> }
  </>
}
