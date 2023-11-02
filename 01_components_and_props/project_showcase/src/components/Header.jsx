import React from 'react'

const Header = ({ isDarkMode, toggleDarkMode }) => {
   
   // MOVING ALL THIS UP TO APP (LIFTING STATE)
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
         <h1>
            <span className='logo'>{"//"}</span>
            Project Showcase
         </h1>
         <nav>
            <button onClick={handleToggleDarkMode}>{buttonText}</button>
         </nav>
      </header>
   )
}

export default Header