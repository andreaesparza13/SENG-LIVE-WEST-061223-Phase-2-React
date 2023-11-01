import React from 'react'

// This is what each individual project card will look like
const ProjectListItem = ({ project }) => {

   const {name, about, link, image, phase} = project

   return (
      <li className='card'>
         <figure className='image'>
            <img src={image} alt={`${name} screenshot`} />
         </figure>
         <section className='details'>
            <h4>{name}</h4>
            <p>{about}</p>
            <p><a href={link}>Live Demo</a></p>
         </section>
         <footer className='extra'>
            <span className='badge blue'>Phase {phase}</span>
         </footer>
      </li>
   )
}

export default ProjectListItem