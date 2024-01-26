const Item = ({tasks, categors, type}) => {
  // console.log('tasks: ')
  // console.log(tasks)
  // console.log("categors: ")
  // console.log(categors)
  // console.log(type)

  // const unorganized = useRef([]);


  // returns the unorganized list
  if(!type){
    return(
      <div className='unorganizedList'>
        {tasks.map((task, i)=>{
          return (
              <div key={i}>
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
            <div key={x}>
              <h1>{cat}</h1>
              <div className='organizedTasks'>
                {tasks.map((task, i)=>{
                  if(task.category === cat){
                    return (
                      <div key={i}>
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