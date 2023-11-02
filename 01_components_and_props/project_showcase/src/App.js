import React, { useState } from 'react'
import Header from './components/Header.jsx'
import ProjectContainer from './components/ProjectContainer.jsx'

// MOVED ALL THESE INTO PROJECTCONTAINER
// import ProjectForm from './components/ProjectForm.jsx'
// import ProjectList from './components/ProjectList.jsx'
// import projectsArr from './projects.js'

function App() {

	// Toggle between dark and light mode
	const [isDarkMode, setIsDarkMode] = useState(true)
   const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
	const appClass = isDarkMode ? "App" : "App light"

	return (
		<div className={appClass}>
				<Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
				<ProjectContainer />
		</div>
	);
}

export default App;
