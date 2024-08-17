import React from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom'


const AdminPanel = () => {
  return (
    <>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
      
    </>
  )
}

export default AdminPanel;