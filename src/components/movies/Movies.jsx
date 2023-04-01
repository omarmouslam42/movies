import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from '../../context/UserContext';

export default function Movies() {
 const {movies,multi,name} = useContext(ApiContext);
 
 return <>
  {movies ||multi?
   <>
   {name?.value !="" && multi !=null? 
    <div className='home container py-5 mt-5 home'>
    <div className='row page'>
      {multi?.filter(el=>el.poster_path && el.title !=null)?.map((movie , idx)=>
         <div key={idx} className='col-lg-2 col-md-3'>
          <Link  to={`/MovieDetails/${movie.media_type}/${movie.id}`}>
          <div className= "movie position-relative ">
        <div className='position-absolute bg-info end-0 rounded-1 p-1'>
            {movie.vote_average}
        </div>
         <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="movie poster" className='w-100' />
         <div className='hoverscreen '>
        <h6 className='mt-4'>{movie.title}</h6>
        <h6>Rate: {movie.vote_average}</h6>
        
         </div>
        </div>
        <h6 className='mb-3 text-center mt-1'>{movie.title}</h6>
          </Link>
       
      </div> )}
    </div>
  
   </div> 
   : 
    <div className='container py-5 mt-5'>
    <div className='mt-3'>
       <h2>All Movies</h2>
     </div>
     <div className='row py-5'>
       {movies.map((movie , idx)=>
          <div key={idx} className='col-lg-2 col-md-3'>
           <Link to={`/MovieDetails/${movie.media_type}/${movie.id}`}>
           <div className= "movie position-relative ">
           <div className='position-absolute bg-info end-0 rounded-1 p-1'>
        {movie.vote_average}
        </div>
          <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="movie poster" className='w-100' />
          <div className='hoverscreen '>
        
         <h6 className='mt-4'>{movie.title}</h6>
         <h6>Rate: {movie.vote_average}</h6>
         
          </div>
         </div>
         <h6 className='mb-3 mt-1 text-center'>{movie.title}</h6>
           </Link>
        
         
       </div> )}
      
       </div>
       
     </div>}
   </>
    :
    <div className='loadingscreen vh-100 d-flex justify-content-center align-items-center'>
        <i className='fa-solid fa-spinner fa-spin text-white fa-4x'></i>
    </div> }
    </>
}
