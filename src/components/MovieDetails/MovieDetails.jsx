import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {

    let {id,media_type} = useParams()
    // console.log(id);
    const [alldetails, setAlldetails] = useState([]);
   
   async function detailsApi() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=f0ed7bd219ff6aef192b03c155acb49d&language=en-US`)
        setAlldetails(data)
    }
    useEffect(() => {
        detailsApi()
       
    });

  return<>

  
  {alldetails.length !=0? <div className='container py-5 mt-5'>
    <div className='row mt-5'>
      <div className='col-md-3'>
        <img src={"https://image.tmdb.org/t/p/w500"+ alldetails.poster_path} className='w-100' alt="poster" />
        <h6 className='mt-2 text-center'>{alldetails.title?alldetails.title:alldetails.name}</h6>
      </div>
      <div className='col-md-9'>
        <h4 >{alldetails.title? alldetails.title:alldetails.name}</h4>
        <p className='my-3 '><span className='text-white  fw-semibold me-2 fs-5'> describtion:</span> {alldetails.overview}</p>
        <div className='mt-5'>
        { alldetails.genres?.map( (genre , idx )=> <span key={idx} className='p-2 rounded-4 bg-info  me-2'>
        {genre.name}</span> )}
        </div>
        

        <h6 className='mt-5'>vote_average: {alldetails.vote_average}</h6>
        <h6>vote_count: {alldetails.vote_count}</h6>
      </div>
    </div>
  </div>:<div className='loadingscreen vh-100 d-flex justify-content-center align-items-center'>
    <i className='fa-solid fa-spinner fa-spin text-white fa-4x'></i>
  </div>}
  
  
  </>
}
