import React from 'react'
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

// This is what each individual project card will look like
const ProjectListItem = ({ project, onEditProject, onUpdateProject, onDeleteProject }) => {

   // Destructure project object so we can access the individual parts of it
   const { id, name, about, link, image, phase, claps } = project

   // ^ No longer using this because we are now persisting to and rendering clapCount from the backend
   // Using state to add claps to each project
   // const [clapCount, setClapCount] = useState(claps)

   const handleClapCounter = () => {

      // ^ Optimistic approach
      // setClapCount(clapCount => clapCount+1)

      // ^Pessimistic approach
      fetch(`http://localhost:4000/projects/${id}`, {
         method: "PATCH",
         headers: { "Content-type": "application/json" },
         body: JSON.stringify({ claps: claps + 1 })
      })
         .then(res => res.json())
         .then(onUpdateProject)
   }

   // ^ Don't need this handler function because the click is a LINK to the edit form
   // const handleEditClick = () => {
   //    onEditProject(project)
   // }

   const handleDeleteClick = () => {
      if (window.confirm("Are you sure you want to delete this project?")) { 
         // ^ Optimistic version of DELETE
         // fetch(`http://localhost:4000/projects/${id}`, { method: "DELETE" })
         // onDeleteProject(id)
         
         // ^ Pessimistic version of DELETE
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
               <Link to={`/projects/${id}/edit`} className='button'>
                  <FaPencilAlt />
               </Link>
               <button onClick={handleDeleteClick}>
                  <FaTrash />
               </button>
            </div>
         </footer>
      </li>
   )
}

export default ProjectListItem