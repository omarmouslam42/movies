import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { createContext,  useEffect, useState } from 'react'




   export const ApiContext = createContext();

 function UserContext(props) {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [movies, setMovies] = useState(null);
    const [tvshows, setTvshows] = useState(null);
    const [multi, setMulti] = useState(null);
    let name =document.querySelector(".searchMovies");


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

    async function searchMoives() {
          let{data}= await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=f0ed7bd219ff6aef192b03c155acb49d&language=en-US&query=${name?.value}&page=1&include_adult=false`)
          // console.log(data.results);
          setMulti(data.results)
    }

  
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
      // console.log("render");
      apiTvShows();
      apiMovies();
    }, []);

    
  return <ApiContext.Provider value={{loggedInUser,name,multi,searchMoives, getTkn , movies , tvshows, removeData ,apiMovies, apiTvShows } }>
  
  {props.children}
  
  </ApiContext.Provider>
}
export default UserContext