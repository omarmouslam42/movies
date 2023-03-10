import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'


export const ApiContext = createContext();

export default function UserContext(props) {

    const [loggedInUser, setLoggedInUser] = useState(null);


    function getTkn() {
      if (localStorage.getItem("tkn") !=null) {
        let user =localStorage.getItem("tkn")
        let tkn = jwtDecode(user)
        // console.log(tkn);
        setLoggedInUser(tkn);
      }
    }
    
    function removeData() {
        localStorage.removeItem("tkn");
        setLoggedInUser(null)
      }

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
  

    
  return <ApiContext.Provider value={  {loggedInUser , getTkn , movies , tvshows, removeData } }>
  
  {props.children}
  
  </ApiContext.Provider>
}
