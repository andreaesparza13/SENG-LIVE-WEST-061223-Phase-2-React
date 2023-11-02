import React, { useState } from 'react'

// This is what each individual project card will look like
const ProjectListItem = ({ image, name, about, link, phase }) => {

   // Destructure project object so we can access the individual parts of it
   // const {name, about, link, image, phase} = project

   // Using state to add claps to each project
   const [clapCount, setClapCount] = useState(0)
   const handleClapCounter = () => {
      setClapCount(clapCount => clapCount+1)
   }

   return (
      <li className='card'>
         <figure className='image'>
            <img src={image} alt={`${name} screenshot`} />
            <button onClick={handleClapCounter} className="claps">👏{clapCount}</button>
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