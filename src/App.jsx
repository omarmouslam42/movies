import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx';
import Reg from './components/regester/Reg';
import About from './components/about/About';
import Home from './components/home/Home';
import Login from './components/login/Login';
import MovieDetails from './components/MovieDetails/MovieDetails';
import jwtDecode from 'jwt-decode';




export default function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  function getTkn() {
    if (localStorage.getItem("tkn") !=null) {
      let user =localStorage.getItem("tkn")
      let tkn = jwtDecode(user)
      console.log(tkn);
      setLoggedInUser(tkn);
    }
  }



  const router = createBrowserRouter([
  {path:"" ,  element: <Nav /> , children:[
    {path:"", element: <Reg />},
    {path:"home", element: <Home />},
    {path:"reg", element: <Reg />},
    {path:"login", element: <Login getTkn={getTkn}/>},
    {path:"MovieDetails", element: <MovieDetails /> , children:[
      {path:":media_type",children:[
        {path:":id"}
      ]},
    ]},
    {path:"about", element: <About />},
  ]}
  ])


  return <>
  <RouterProvider router={router}/>
  
  </>
}
