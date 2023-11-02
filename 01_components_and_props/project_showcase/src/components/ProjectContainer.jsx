import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'

// NO LONGER NEED THIS SINCE WE ARE FETCHING PROJECTS FROM DB.JSON
// import projectsArr from '../projects'

const ProjectContainer = () => {

   // Using STATE to bring in PROJECTS from db.json into an array -- more dynamic than using projects.js because this is how we would fetch from an api 
   const [projects, setProjects] = useState([])
   const onLoadProjects = () => {
      fetch("http://localhost:4000/projects")
      .then(res => res.json())
      .then(projects => setProjects(projects))
   }

   return (
      <div>
         <div>
				<ProjectForm 
               projects={projects}
               setProjects={setProjects}
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