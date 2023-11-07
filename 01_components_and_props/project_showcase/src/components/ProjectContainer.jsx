import React, { useState, useEffect } from 'react'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'

// NO LONGER NEED THIS SINCE WE ARE FETCHING PROJECTS FROM DB.JSON
// import projectsArr from '../projects'

const ProjectContainer = () => {

   // Using STATE to bring in PROJECTS from db.json into an array -- more dynamic than importing from projects.js because this is how we would fetch from an API
   const [projects, setProjects] = useState([])

   // Giving functionality to "Phase" buttons by using a side effect
   const [selectedPhase, setSelectedPhase] = useState("")

   // Moving search bar functionality here
   const [searchQuery, setSearchQuery] = useState('')

   // Moved away from using a button to load the projects and into using a useEffect 
   // Empty dependency array stops this from rerendering on an infinite loop
   useEffect(() => {
      // This does not need to be a function, could just run the fetch
      // const onLoadProjects = () => {
      //    fetch("http://localhost:4000/projects")
      //    .then(res => res.json())
      //    .then(projectsData => setProjects(projectsData))
      // }
      // onLoadProjects()

      // This makes our phase filter buttons make a specific request to our database by concatenating the get url
      // This is better than doing it with local state especially as database gets bigger
      let url = "http://localhost:4000/projects" 
      if (selectedPhase && searchQuery) {
         url += `?phase=${selectedPhase}&q=${searchQuery}`
      } else if (selectedPhase) {
         url += `?phase=${selectedPhase}`
      } else if (searchQuery) {
         url += `?q=${searchQuery}`
      }
      fetch(url)
      .then(res => res.json())
      .then(projectsData => setProjects(projectsData))
   }, [selectedPhase, searchQuery])

   const onAddProject = (project) => {
      setProjects([...projects, project])

      // Optimistic Rendering of POST Request by doing it here
      // fetch("http://localhost:4000/projects", {
      //    method: "POST",
      //    headers: { 'Content-Type': "application/json" },
      //    body: JSON.stringify(project)
      // })
      // .then(res => res.json())
      // .then(setProjects(projects => [...projects, project]))
   }

   return (
      <div>
         <div>
				<ProjectForm 
               onAddProject={onAddProject}
            />
			</div>
			<div>
				<ProjectList 
               projects={projects}

               // Don't need this anymore because of the useEffect
               // loadProjects={onLoadProjects} 

               onSelectPhase={setSelectedPhase}
               onSearchChange={setSearchQuery}
               searchQuery={searchQuery}
            />
			</div>
      </div>
   )
}

export default ProjectContainer