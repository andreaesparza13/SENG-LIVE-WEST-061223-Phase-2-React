import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const initialState = {
   'name': "",
   'about': "",
   'phase': "",
   'image': "",
   'link': "",
}

const ProjectForm = ({ onAddProject }) => {
      
   const [formData, setFormData] = useState(initialState)

   const history = useHistory()

   // This is the same as above but done one by one
   // const [name, setName] = useState('')
   // const [about, setAbout] = useState('')
   // const [imageUrl, setImage] = useState('')
   // const [link, setLink] = useState('')
   // const [phase, setPhase] = useState(0)

   const handleOnChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const handleFormSubmit = (e) => {
      e.preventDefault()
      // ^ Pessimistic rendering of POST request here
      fetch("http://localhost:4000/projects", {
         method: "POST",
         headers: { 'Content-Type': "application/json" },
         body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(newProject => {
         onAddProject(newProject)
         history.push("/projects")
      })            
      // onAddProject(formData)
      setFormData(initialState)
   }

   return (
      <section>
         <form className="form" onSubmit={handleFormSubmit}>
            <h2>Add New Project</h2>
            <br/>
            <label htmlFor="name">Project Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} />
            <label htmlFor="about">Project Description</label>
            <textarea id="about" name="about" value={formData.about} onChange={handleOnChange} />
            <label htmlFor='phase'>Phase</label>
            <select id='phase' name='phase' value={formData.phase} onChange={handleOnChange}>
               <option value='select-phase'>Select Phase</option>
               <option value='1'>Phase 1</option>
               <option value='2'>Phase 2</option>
               <option value='3'>Phase 3</option>
               <option value='4'>Phase 4</option>
            </select>
            <label htmlFor='image'>Screenshot</label>
            <input type='text' id='image' name='image' value={formData.image} onChange={handleOnChange} />
            <label htmlFor='link'>Link to Live Project Website</label>
            <input type='text' id='link' name='link' value={formData.link} onChange={handleOnChange} />
            <button type="submit">Add Project</button>
         </form>
      </section>
   )
}

export default ProjectForm