import React, { useContext }  from 'react'
import { Link } from 'react-router-dom';
import ThemeContext from '../Context/ThemeContext'





const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
   return (
   <nav>
    <h2 className="logo"> <Link to="/dashboard" className='link'>TaskMaster</Link></h2>
   <div className='toggle'>
    <ul className='nav-link'>
        <li><Link to="/dashboard" className='link'>Dashboard</Link></li>
        <li><Link to="/add-task"  className='link'>Create Task</Link></li>
        <li><Link to="/settings"  className='link'>Settings</Link></li>
        
    
    </ul>
    <button 
        onClick={toggleTheme} 
       >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
    

   </nav>
  )
}

export default Navbar