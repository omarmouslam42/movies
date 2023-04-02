import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx';
import Reg from './components/regester/Reg';
// import About from './components/about/About';
import Home from './components/home/Home';
import Login from './components/login/Login';
import MovieDetails from './components/MovieDetails/MovieDetails';
// import jwtDecode from 'jwt-decode';
import Movies from './components/movies/Movies.jsx';
import TVshows from './components/tvshows/TVshows.jsx';
import React, { useContext } from 'react'
import { ApiContext } from './context/UserContext.jsx';

export default function App() {
  // const {loggedInUser} = useContext(ApiContext);

  function ProtectRoute(props) {
    
    if (localStorage.getItem("tkn") ===null) {
      // loggedInUser ==null
      // el user lsa mga4
      return<Navigate to="/login" />
    }
    else{
      // el user tmam
      return<>
      {props.children}
      </>
    }
  }
  

  const router = createBrowserRouter([
  {path:"" ,  element: <Nav /> , children:[
    {path:"", element: <ProtectRoute> <Home/> </ProtectRoute>},
    {path:"", element: <Login />},
    {path:"reg", element: <Reg />},
    {path:"login", element: <Login />},
    {path:"home", element: <ProtectRoute> <Home/> </ProtectRoute>},
    {path:"movies", element:<ProtectRoute> <Movies /></ProtectRoute>},
    {path:"tvshows", element:<ProtectRoute> <TVshows/> </ProtectRoute>},
    {path:"MovieDetails", element: <ProtectRoute> <MovieDetails/> </ProtectRoute> , children:[
      {path:":media_type",children:[
        {path:":id"}
      ]},
    ]},
    
  ]},
 
  ])


  return <>
  <RouterProvider router={router}/>
  
  </>
}
