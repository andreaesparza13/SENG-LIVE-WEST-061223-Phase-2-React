import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const ProjectEditForm = ({ projectToEdit, onUpdateProject }) => {

   const { id } = useParams()
   const history = useHistory()

   const [formData, setFormData] = useState({
      name: "",
      about: "",
      link: "",
      image: "",
      phase: "",
   })
   const { name, about, phase, link, image } = formData
   
   // Re-fetches the projectToEdit from the database upon load to ensure we have the most recent values for our FormData
   useEffect(() => {
      fetch(`http://localhost:4000/projects/${id}`)
         .then(res => res.json())
         .then(project => setFormData(project))
   }, [id])

   const handleOnChange = (e) => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      // ^ Optimistic PATCH
      // fetch(`http://localhost:4000/projects/${projectToEdit.id}`, {
      //    method: "PATCH",
      //    headers: { 'Content-Type': "application/json" },
      //    body: JSON.stringify(formData)
      // })
      // onUpdateProject(formData)

      // ^ Pessimistic PATCH
      fetch(`http://localhost:4000/projects/${id}`, {
         method: "PATCH",
         headers: { 'Content-Type': "application/json" },
         body: JSON.stringify(formData)
      })
         .then(res => res.json())
         .then(updatedProject => {
            onUpdateProject(updatedProject)
            history.push(`/projects/${id}`)
         })
   }

   return (
      <form onSubmit={handleSubmit} className='form'>
         <h3>Edit Project</h3>
         <br/>
         <label htmlFor="name">Project Name</label>
         <input type="text" id="name" name="name" value={name} onChange={handleOnChange} />
         <label htmlFor="about">Project Description</label>
         <textarea id="about" name="about" value={about} onChange={handleOnChange} />
         <label htmlFor='phase'>Phase</label>
         <select id='phase' name='phase' value={phase} onChange={handleOnChange}>
            <option value='select-phase'>Select Phase</option>
            <option value='1'>Phase 1</option>
            <option value='2'>Phase 2</option>
            <option value='3'>Phase 3</option>
            <option value='4'>Phase 4</option>
         </select>
         <label htmlFor='image'>Screenshot</label>
         <input type='text' id='image' name='image' value={image} onChange={handleOnChange} />
         <label htmlFor='link'>Link to Live Project Website</label>
         <input type='text' id='link' name='link' value={link} onChange={handleOnChange} />
         <button type="submit">Update Project</button>
      </form>
   )
}

export default ProjectEditForm