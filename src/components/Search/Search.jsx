import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from '../../context/UserContext';

export default function Search() {
    const {multi } = useContext(ApiContext);
  return <>
  <div className='home container py-5 mt-5 home'>
  <div className='row page'>
    {multi?.map((multi , idx)=>
       <div key={idx} className='col-lg-2 col-md-3'>
        <Link  to={`/MovieDetails/${multi.media_type}/${multi.id}`}>
        <div className= "movie position-relative ">
       <img src={"https://image.tmdb.org/t/p/w500"+ multi.poster_path} alt="movie poster" className='w-100' />
       <div className='hoverscreen '>
      <h6 className='mt-4'>{multi.title}</h6>
      <h6>Rate: {multi.vote_average}</h6>
      
       </div>
      </div>
      <h6 className='mb-3 text-center mt-1'>{multi.title}</h6>
        </Link>
     
    </div> )}
  </div>

 </div>
  
  </>
}
