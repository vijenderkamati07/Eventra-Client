import React from "react";
import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import Signup from './Pages/Auth/Signup';

import App from "./App";
import Layout from "./Layout/Layout"
import "./index.css";
import Login from "./Pages/Auth/Login";
import { AuthProvider } from "./Context/AuthContext";

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"/user/login",
        element:<Login/>
      },
      {
        path:"/user/signup",
        element:<Signup/>
      },]
  }
]
)

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)