import React, { useContext, useEffect} from 'react'
import { Link} from 'react-router-dom';
import { ApiContext } from '../../context/UserContext';

export default function Home() {

 const {movies,tvshows,multi,name,DeleteSearch} = useContext(ApiContext);
  
  return <>
 {movies && tvshows || multi? 
 <>
 {name?.value != "" && multi !=null?
  <div className='home container py-5 mt-5 home'>
  <div className='row page'>
    {multi?.filter(el=>el.poster_path && el.title !=null)?.map((movie , idx)=>
       <div key={idx} className='col-lg-2 col-md-3'>
        <Link onClick={DeleteSearch} to={`/MovieDetails/${movie.media_type}/${movie.id}`}>
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
  <div className='home container py-5 mt-5 home'>
 <div className='mt-3'>
   <h2>Movies</h2>
 </div>
 <div className='row page'>
   {movies?.map((movie , idx)=>
      <div key={idx} className='col-lg-2 col-md-3'>
       <Link  to={`/MovieDetails/${movie.media_type}/${movie.id}`}>
       <div className= "movie position-relative ">

        <div className='position-absolute bg-info end-0 rounded-1 p-1'>
        {movie.vote_average}
        </div>

      <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="movie poster" className='w-100' />
      <div className='hoverscreen h-100'>
     <h6 className='mt-4'>{movie.title}</h6>
     <h6>Rate: {movie.vote_average}</h6> 
      </div>
     </div>
     <h6 className='mb-3 text-center mt-1'>{movie.title}</h6>
       </Link> 
   </div> )}
 </div>

 <div className='mt-4'>
   <h2>Tv Shows</h2>
 </div>
 <div className='row py-5'>
   {tvshows?.map((tv , idx)=>
      <div key={idx} className='col-lg-2 col-md-3'>
       <Link to={`/MovieDetails/${tv.media_type}/${tv.id}`}>
       <div className= "movie position-relative ">
       <div className='position-absolute bg-info end-0 rounded-1 p-1'>
        {tv.vote_average}
        </div>

      <img src={"https://image.tmdb.org/t/p/w500"+ tv.poster_path} alt="movie poster" className='w-100' />
      <div className='hoverscreen '>
    
     <h6 className='mt-4 '>{tv.name}</h6>
     <h6 >Rate: {tv.vote_average}</h6>
      </div>
     </div>
       </Link>
     
     <h6 className='mb-3 text-center mt-1'>{tv.name}</h6>
      </div> )}
   </div>

  </div>
 }
 </>
 :<div className='loadingscreen vh-100 d-flex justify-content-center align-items-center'>
    <i className='fa-solid fa-spinner fa-spin text-white fa-4x'></i>
  </div> }
  </>
}
