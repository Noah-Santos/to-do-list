import React from 'react'

const Item = (tasks) => {
    console.log(tasks)
  return (
    <div className='itemSection'>
        <span><h2>{tasks.tasks.name}</h2> - {tasks.tasks.category}</span>
        <p>{tasks.tasks.description}</p>
    </div>
  )
}

export default Item;