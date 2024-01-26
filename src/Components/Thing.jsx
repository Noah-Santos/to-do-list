import React from 'react'

const Thing = (tasks) => {
  return (
    <div>
        <p className="taskTitle">{tasks.name}</p>
        <p className="taskDescription">{tasks.description}</p>
    </div>
  )
}

export default Thing;