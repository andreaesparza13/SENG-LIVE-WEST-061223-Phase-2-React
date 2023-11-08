import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ isDarkMode, toggleDarkMode }) => {
   
   // ^ MOVING ALL THIS UP TO APP (LIFTING STATE)
   // const [isDarkMode, setIsDarkMode] = useState(true)
   // const toggleDarkMode = () => {
   //    setIsDarkMode(!isDarkMode)
   // }

   const handleToggleDarkMode = (e) => {
      toggleDarkMode()
   }

   const buttonText = isDarkMode ? "Light Mode" : "Dark Mode"

   return (
      <header>
         <h1 className="branding">
            <Link to="/"><span className="logo">{"//"}</span>
               Project Showcase
            </Link>
         </h1>
         <nav>
            <div className="navigation">
               <NavLink className="button" exact to="/">
                  Home
               </NavLink>
               <NavLink className="button" to="/about">
                  About
               </NavLink>
               <NavLink className="button" exact to="/projects">
                  All Projects
               </NavLink>
               <NavLink className="button" to="/projects/new">
                  Add Project
               </NavLink>
               <button onClick={handleToggleDarkMode}>{buttonText}</button>
            </div>
         </nav>
      </header>
   )
}

export default Header