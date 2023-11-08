import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectForm from './ProjectForm.jsx'
import ProjectList from './ProjectList.jsx'
import ProjectEditForm from './ProjectEditForm.jsx'
import ProjectDetail from './ProjectDetail.jsx'

// ^ NO LONGER NEED THIS SINCE WE ARE FETCHING PROJECTS FROM DB.JSON
// import projectsArr from '../projects'

const ProjectContainer = () => {

   // Using STATE to bring in PROJECTS from db.json into an array -- more dynamic than importing from projects.js because this is how we would fetch from an API
   const [projects, setProjects] = useState([])
   // const [projectToEdit, setProjectToEdit] = useState(null)

   // Giving functionality to "Phase" buttons by using a side effect
   const [selectedPhase, setSelectedPhase] = useState("")

   // Moving search bar functionality here
   const [searchQuery, setSearchQuery] = useState('')

   // ^ Moved away from using a button to load the projects and into using a useEffect 

   // Empty dependency array stops this from rerendering on an infinite loop
   useEffect(() => {
      // ^ This does not need to be a function, could just run the fetch
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
      setProjects(projects => [...projects, project])

      // ^ Optimistic Rendering of POST Request by doing it here
      // fetch("http://localhost:4000/projects", {
      //    method: "POST",
      //    headers: { 'Content-Type': "application/json" },
      //    body: JSON.stringify(project)
      // })
      // .then(res => res.json())
      // .then(setProjects(projects => [...projects, project]))
   }

   const onUpdateProject = (updatedProject) => {
      // setProjectToEdit(null)

      // setProjects(projects => {
      //    return projects.map(originalProject => {
      //       if (originalProject.id === updatedProject.id) {
      //          return updatedProject
      //       } else {
      //          return originalProject
      //       }
      //    })
      // })

      // ^ Takes the above code and compacts into a ternary expression
      setProjects(projects => projects.map(project => project.id === updatedProject.id ? updatedProject : project))
   }

   // const onEditProject = (project) => {
   //    setProjectToEdit(project)
   // }

   const onDeleteProject = (projectId) => {
      setProjects(projects => {
         return projects.filter(project => project.id !== projectId)
      })
   }

   // const renderForm = () => {
   //    if (projectToEdit) {
   //       return (
   //          <ProjectEditForm 
   //             projectToEdit={projectToEdit}
   //             onUpdateProject={onUpdateProject}
   //          />
   //       )
   //    } else {
   //       return <ProjectForm onAddProject={onAddProject} />
   //    }
   // }

   return (
      <Switch>
         <Route path="/projects/new">
            <ProjectForm onAddProject={onAddProject} />
         </Route>
         <Route path="/projects/:id/edit">
            <ProjectEditForm onUpdateProject={onUpdateProject}/>
         </Route>
         <Route path="/projects/:id">
            <ProjectDetail />
         </Route>
         <Route>
            <ProjectList 
               projects={projects}
               
               
               // onEditProject={onEditProject}

               onUpdateProject={onUpdateProject}
               onDeleteProject={onDeleteProject}
               
               // ^ Don't need this anymore because of the useEffect
               // loadProjects={onLoadProjects} 
               
               onSelectPhase={setSelectedPhase}
               
               setSearchQuery={setSearchQuery}
               // searchQuery={searchQuery}
            />
         </Route>
      </Switch>
   )
}

export default ProjectContainer