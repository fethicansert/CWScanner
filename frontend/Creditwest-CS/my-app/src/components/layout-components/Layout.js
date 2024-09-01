import React from 'react'
import Sidebar from "./Sidebar";
import { Outlet, Route } from 'react-router-dom';


const Layout = ({children}) => {
  return (
    <div className='layout'>

      <Sidebar />

      <Outlet />
      
    </div>
  )
}

export default Layout
