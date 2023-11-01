import React, { useState } from 'react'
import ProjectListItem from './ProjectListItem'

// This is the CONTAINER for the projects
const ProjectList = ({ projects }) => { // destructuring props by using curly braces here

   // Add state to search bar
   const [searchBarText, setSearchBarText] = useState('')

   // Creates search bar
   const handleSearch = (e) => {
      setSearchBarText(e.target.value)
   }

   // Uses FILTER method to sift through projects and grab whichever ones INCLUDE the search bar text in the name or about section
   // Uses toLowerCase method on both the projects and search bar text so nothing is case sensitive
   const searchResults = projects.filter(project => {
      return (
         project.name.toLowerCase().includes(searchBarText) ||
         project.about.toLowerCase().includes(searchBarText)
      )
   })
  
   // Mapping over the array of projects and passing down to ProjectListItem component so we can build what a single project card will look like there
   const projectItems = searchResults.map(project => {
      return <ProjectListItem key={project.id} project={project} />
   })

   return (
      <section>
         <h3>Projects</h3>
         <div className='filter'>
            <button>All</button>
            <button>Phase 1</button>
            <button>Phase 2</button>
            <button>Phase 3</button>
            <button>Phase 4</button>
            <button>Phase 5</button>
         </div>
         <input onChange={handleSearch} type='text' placeholder='Search...' />
         <ul className='cards'>
            {projectItems}
         </ul>
      </section>
   )
}

export default ProjectList