import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Dashboard from '../Components/Dashboard'
import Task from '../Components/Task'
import Setting from '../Components/Setting'

const Routing = () => {
  return (
  <BrowserRouter>
  <Routes>
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/add-task" element={<Task/>} />
  <Route path="/settings" element={<Setting/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default Routing