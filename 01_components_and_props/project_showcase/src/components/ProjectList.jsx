import React, { useEffect, useState } from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = ({ projects, onSelectPhase, setSearchQuery, onEditProject, onUpdateProject, onDeleteProject }) => { // destructuring props by using curly braces here

   // Debounce searchQuery so we can reduce amount of re-renders while using search bar
   const [searchBarText, setSearchBarText] = useState('')

   // Creates search bar
   const handleSearch = (e) => {
      // setSearchBarText(e.target.value)
      setSearchBarText(e.target.value)
   }

   useEffect(() => {
      const scheduledUpdate = setTimeout(() => {
         setSearchQuery(searchBarText)
      }, 500)

      return () => {
         clearTimeout(scheduledUpdate)
      } // eslint-disable-next-line
   }, [searchBarText]) 
   
   // ^ MOVED ALL THIS INTO PROJECT CONTAINER
   // Use state to bring in projects array
   // const [projects, setProjects] = useState([])
   // Loading projects from json using state and fetch call
   // const loadProjects = () => {
   //    fetch("http://localhost:4000/projects")
   //    .then(res => res.json())
   //    .then(projects => setProjects(projects))
   // }

   // ^ No longer need this because we are not using a button to load projects anymore
   // const handleLoadButtonClick = (e) => loadProjects()
   
   // ^ No longer need this because we are filtering from the backend instead of local state
   // Uses FILTER method to sift through projects and grab whichever ones INCLUDE the search bar text in the name or about section
   // Uses toLowerCase method on both the projects and search bar text so nothing is case sensitive
   // const searchResults = projects.filter(project => {
   //    return (
   //       project.name.toLowerCase().includes(searchBarText) ||
   //       project.about.toLowerCase().includes(searchBarText)
   //    )
   // })

   // ^ No longer need this because the projects we need are already being passed in as props
   // Mapping over the array of projects and passing down to ProjectListItem component so we can build what a single project card will look like there
   // const projectItems = searchResults.map(project => {
   //    return <ProjectListItem key={project.id} project={project} />
   // })

   // ^ No longer need this because the projects we need are already being passed in as props
   // Re-writing the above code as a function to render projects
   // const renderProjects = (projects) => {
   //    return projects.map(project => (
   //       <ProjectListItem
   //          key={project.id}
            // This shortcut allows us to pass in the destructured props in ProjectListItem component
   //          {...project}
            
            // Doing it this way would mean we have to destructure inside of ProjectListItem
            // project={project}
   //       />
   //    ))
   // }

   // ^ Using this because we can use .map directly on the projects array that is being passed in as props
   const projectCards = projects.map(project => (
      <ProjectListItem 
         key={project.id}
         project={project}
         onEditProject={onEditProject}
         onUpdateProject={onUpdateProject}
         onDeleteProject={onDeleteProject}
      />
   ))

   return (
      <section>
         {/* // ^ Removed this button because projects are now loading with a useEffect inside of ProjectContainer */}
         {/* <button onClick={handleLoadButtonClick}>Load Projects</button> */}
         <h2>Projects</h2>

         <div className='filter'>
            <button onClick={() => onSelectPhase("")}>All</button>
            <button onClick={() => onSelectPhase("1")}>Phase 1</button>
            <button onClick={() => onSelectPhase("2")}>Phase 2</button>
            <button onClick={() => onSelectPhase("3")}>Phase 3</button>
            <button onClick={() => onSelectPhase("4")}>Phase 4</button>
            <button onClick={() => onSelectPhase("5")}>Phase 5</button>
         </div>

         <input 
            onChange={handleSearch} 
            type='text' 
            placeholder='Search...' 
            // value={searchQuery} 
         />

         <ul className='cards'>{projectCards}</ul>
      </section>
   )
}

export default ProjectList