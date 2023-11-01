import React from 'react'
import ProjectListItem from './ProjectListItem'

// This is the CONTAINER for the projects
const ProjectList = ({ projects }) => { // destructuring props by using curly braces here
  
   // Mapping over the array of projects and passing down to ProjectListItem component so we can build what a single project card will look like there
   const projectItems = projects.map(project => {
      return <ProjectListItem key={project.id} project={project} />
   })

   return (
      <section>
         <h3>Project List</h3>
         <ul className='cards'>
            {projectItems}
         </ul>
      </section>
   )
}

export default ProjectList