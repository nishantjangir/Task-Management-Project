import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   <nav>
    <h2 className="logo"> <Link to="/dashboard" className='link'>TaskMaster</Link></h2>
    <ul className='nav-link'>
        <li><Link to="/dashboard" className='link'>Dashboard</Link></li>
        <li><Link to="/add-task"  className='link'>Create Task</Link></li>
        <li><Link to="/settings"  className='link'>Settings</Link></li>
    </ul>
   </nav>
  )
}

export default Navbar