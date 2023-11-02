import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'

// NO LONGER NEED THIS SINCE WE ARE FETCHING PROJECTS FROM DB.JSON
// import projectsArr from '../projects'

const ProjectContainer = () => {

   // Using STATE to bring in PROJECTS from db.json into an array -- more dynamic than importing from projects.js because this is how we would fetch from an API
   const [projects, setProjects] = useState([])
   const onLoadProjects = () => {
      fetch("http://localhost:4000/projects")
      .then(res => res.json())
      .then(projectsData => setProjects(projectsData))
   }

   const onAddProject = (project) => {
      fetch("http://localhost:4000/projects", {
         method: "POST",
         headers: { 'Content-Type': "application/json" },
         body: JSON.stringify(project)
      })
      .then(res => res.json())
      .then(setProjects([...projects, project]))
      // setProjects([...projects, project])
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
               loadProjects={onLoadProjects} 
            />
			</div>
      </div>
   )
}

export default ProjectContainer