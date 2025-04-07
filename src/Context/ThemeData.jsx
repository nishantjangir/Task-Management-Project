import React, { useState , useEffect } from 'react'
import ThemeContext from './ThemeContext'

const ThemeData = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };



  return (
   <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {props.children}
   </ThemeContext.Provider>
  )
}

export default ThemeData