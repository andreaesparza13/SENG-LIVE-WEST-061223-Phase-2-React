import React from 'react'
import { FaPencilAlt, FaTrash } from "react-icons/fa";

// This is what each individual project card will look like
const ProjectListItem = ({ project, onEditProject, onUpdateProject, onDeleteProject }) => {

   // Destructure project object so we can access the individual parts of it
   const { id, name, about, link, image, phase, claps } = project

   // Using state to add claps to each project
   // const [clapCount, setClapCount] = useState(claps)

   // Not using state for clapCount anymore so we can persist to database directly (setting state would be redundant and would change on re-render)
   const handleClapCounter = () => {
      // setClapCount(clapCount => clapCount+1)
      fetch(`http://localhost:4000/projects/${id}`, {
         method: "PATCH",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ claps: claps + 1 })
      })
         .then(res => res.json())
         .then(onUpdateProject)
   }

   const handleEditClick = () => {
      onEditProject(project)
   }

   const handleDeleteClick = () => {
      if (window.confirm("Are you sure you want to delete this project?")) { 
         // optimistic version of DELETE
         // fetch(`http://localhost:4000/projects/${id}`, { method: "DELETE" })
         // onDeleteProject(id)
         
         // pessimistic version of DELETE
         fetch(`http://localhost:4000/projects/${id}`, { method: "DELETE" })
         .then(res => {
            if(res.ok) {
               onDeleteProject(id)
            }
         })
        
      }
    }

   return (
      <li className='card'>
         <figure className='image'>
            <img src={image} alt={`${name} screenshot`} />
            <button onClick={handleClapCounter} className="claps">👏{claps}</button>
         </figure>
         <section className='details'>
            <h4>{name}</h4>
            <p>{about}</p>
            <p><a href={link}>Live Demo</a></p>
         </section>
         <footer className='extra'>
            <span className='badge blue'>Phase {phase}</span>
            <div className="manage">
               <button onClick={handleEditClick}>
                  <FaPencilAlt />
               </button>
               <button onClick={handleDeleteClick}>
                  <FaTrash />
               </button>
            </div>
         </footer>
      </li>
   )
}

export default ProjectListItem