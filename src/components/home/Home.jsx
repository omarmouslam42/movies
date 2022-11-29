import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

  const [movies, setMovies] = useState(null);
  const [tvshows, setTvshows] = useState(null);

  async function apiMovies() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=f0ed7bd219ff6aef192b03c155acb49d`)
    // console.log(data.results);
    
    setMovies(data.results)
  }
  async function apiTvShows() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=f0ed7bd219ff6aef192b03c155acb49d`)
    // console.log(data.results);
    
    setTvshows(data.results)
  }

  useEffect(() => {
    apiMovies()
    apiTvShows()
  });

  return <>
  
 {movies && tvshows?<div className='container'>
 <div className='mt-3'>
    <h2>Movies</h2>
  </div>
  <div className='row py-5'>
    {movies.map((movie , idx)=>
       <div key={idx} className='col-md-2'>
        <Link to={`/MovieDetails/${movie.media_type}/${movie.id}`}>
        <div className= "movie position-relative ">
       <img src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="movie poster" className='w-100' />
       <div className='hoverscreen '>
     
      <h6 className='mt-4'>{movie.title}</h6>
      <h6>Rate: {movie.vote_average}</h6>
      
       </div>
      </div>
      <h6 className='mb-3'>{movie.title}</h6>
        </Link>
     
      
    </div> )}
   
  </div>
  <div className='mt-4'>
    <h2>Tv Shows</h2>
  </div>
  <div className='row py-5'>
    {tvshows.map((tv , idx)=>
       <div key={idx} className='col-md-2'>
        <Link to={`/MovieDetails/${tv.media_type}/${tv.id}`}>
        <div className= "movie position-relative ">
       <img src={"https://image.tmdb.org/t/p/w500"+ tv.poster_path} alt="movie poster" className='w-100' />
       <div className='hoverscreen '>
     
      <h6 className='mt-4'>{tv.name}</h6>
      <h6 >Rate: {tv.vote_average}</h6>
       </div>
      </div>
        </Link>
      
      <h6 className='mb-3'>{tv.name}</h6>
       </div> )}
    
   
    </div>


  
 </div>:<div className='loadingscreen vh-100 d-flex justify-content-center align-items-center'>
    <i className='fa-solid fa-spinner fa-spin text-white fa-4x'></i>
  </div> }

 



 
  </>
}
