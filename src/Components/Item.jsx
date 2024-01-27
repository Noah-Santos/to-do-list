const Item = ({tasks, categors, type}) => {
  // returns the unorganized list
  if(!type){
    return(
      <div className='unorganizedList'>
        {tasks.map((task, i)=>{
          return (
              <div key={i} className="item">
                <p className="taskTitle">{task.name} - {task.category}</p>
                <p className="taskDescription">{task.description}</p>
              </div>
            )
        })}
      </div>
    )
  }
  // returns the organized list
  return (
    <div className='organizedList'>
        {categors.map((cat, x)=>{
          return (
            <div key={x} className="catSection">
              <h1 className="catTitle">{cat}</h1>
              <hr className="line" />
              <div className='organizedTasks'>
                {tasks.map((task, i)=>{
                  if(task.category === cat){
                    return (
                      <div key={i} className="info">
                        <p className="taskTitle">{task.name} - <span className="taskDescription">{task.description}</span></p>
                    </div>
                    )
                  }
                  return <></>
                })}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Item;