import React from 'react'

const Item = (tasks, type) => {
  console.log('tasks: ')
  console.log(tasks.tasks)
  console.log("categors: ")
  console.log(tasks.categors)

  // returns the unorganized list
  if(!type){
    return(
      <div>

      </div>
    )
  }
  // returns the organized list
  return (
    <div className='itemSection'>
        <span><h2>{tasks.tasks.name}</h2> - {tasks.tasks.category}</span>
        <p>{tasks.tasks.description}</p>
    </div>
  )
}

export default Item;