import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx';
import Reg from './components/regester/Reg';
import About from './components/about/About';
import Home from './components/home/Home';
import Login from './components/login/Login';
import MovieDetails from './components/MovieDetails/MovieDetails';
export default function App() {

  const router = createBrowserRouter([
  {path:"" ,  element: <Nav /> , children:[
    {path:"", element: <Reg />},
    {path:"home", element: <Home />},
    {path:"reg", element: <Reg />},
    {path:"login", element: <Login />},
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
