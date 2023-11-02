import React, { useState } from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = ({ projects, loadProjects }) => { // destructuring props by using curly braces here

   // Add state to search bar
   const [searchBarText, setSearchBarText] = useState('')

   // Creates search bar
   const handleSearch = (e) => {
      setSearchBarText(e.target.value)
   }
   
   // MOVED ALL THIS INTO PROJECT CONTAINER
   // Use state to bring in projects array
   // const [projects, setProjects] = useState([])
   // Loading projects from json using state and fetch call
   // const loadProjects = () => {
   //    fetch("http://localhost:4000/projects")
   //    .then(res => res.json())
   //    .then(projects => setProjects(projects))
   // }

   const handleLoadButtonClick = (e) => loadProjects()
   
   // Uses FILTER method to sift through projects and grab whichever ones INCLUDE the search bar text in the name or about section
   // Uses toLowerCase method on both the projects and search bar text so nothing is case sensitive
   const searchResults = projects.filter(project => {
      return (
         project.name.toLowerCase().includes(searchBarText) ||
         project.about.toLowerCase().includes(searchBarText)
      )
   })

   // Mapping over the array of projects and passing down to ProjectListItem component so we can build what a single project card will look like there
   // const projectItems = searchResults.map(project => {
   //    return <ProjectListItem key={project.id} project={project} />
   // })

   // Re-writing the above code as a function to render projects
   const renderProjects = (projects) => {
      return projects.map(project => (
         <ProjectListItem
            key={project.id}
            // This shortcut allows us to pass in the destructured props in ProjectListItem component
            {...project}
            
            // Doing it this way would mean we have to destructure inside of ProjectListItem
            // project={project}
         />
      ))
   }

   return (
      <section>
         <button onClick={handleLoadButtonClick}>Load Projects</button>
         <br/>
         <h3>Projects</h3>
         <div className='filter'>
            <button>All</button>
            <button>Phase 1</button>
            <button>Phase 2</button>
            <button>Phase 3</button>
            <button>Phase 4</button>
            <button>Phase 5</button>
         </div>
         <input onChange={handleSearch} type='text' placeholder='Search...' value={searchBarText} />
         <ul className='cards'>
            {renderProjects(searchResults)}
         </ul>
      </section>
   )
}

export default ProjectList