import {useReducer, useState, useRef} from 'react';

const Task = (tasks) => {
  const cat = useRef(null)
  cat.current = (JSON.parse(sessionStorage.getItem('categories')) || ['sure']);
  
  function reducer(state, action){
    // creates the task
    if(action.type === 'create'){
      let newTask = {name: action.tasName, category: (cat.current[action.tasCat-1] || 'none'), description: action.tasDesc}
      // updates storage variable
      sessionStorage.setItem('tasks', JSON.stringify([...state, newTask]));
      return [...state, newTask];
    }
    // edits the task
    if(action.type === 'edit'){
      state[action.oldTas] = {name: action.changeName, category: (cat.current[action.changeCat-1] || 'none'), description: action.changeDesc}
      // updates storage variable
      sessionStorage.setItem('tasks', JSON.stringify([...state]));
      return [...state];
    }
    // deletes the task
    if(action.type === 'delete'){
      let newTasks = state.filter((c, i)=> Number(i) !== Number(action.removeTas));
      // updates storage variable
      sessionStorage.setItem('tasks', JSON.stringify([...newTasks]));
      return [...newTasks];
    }
    return [...state];
  }

  const [state, dispatch] = useReducer(reducer, tasks.tasks);
  const [createForm, setCreateForm] = useState(true);
  const old = useRef(null);
  const createName = useRef(null);
  const createCat = useRef(null);
  const createDesc = useRef(null);
  const editName = useRef(null);
  const editCat = useRef(null);
  const editDesc = useRef(null);

  // calls reducer function to create a task
  function createTask(){
    if(createName.current.value && createCat.current.value && createDesc.current.value){
      dispatch({type: 'create', tasName: createName.current.value, tasCat: createCat.current.value, tasDesc: createDesc.current.value});
    }
    // resets inputs
    createName.current.value = '';
    createCat.current.value = '';
    createDesc.current.value = '';
  }

  // calls reducer function to edit the task
  function editTask(){
    dispatch({type: 'edit', changeName: editName.current.value, changeCat: editCat.current.value, changeDesc: editDesc.current.value, oldTas: old.current.value});
  }

  // calls reducer function to delete the task
  function deleteTask(){
    dispatch({type: 'delete', removeTas: old.current.value});
    // resets inputs
    editName.current.value = state[0].name;
    // editCat.current.value = 0;
    for(let i = 0; i < cat.current.length; i++){
      if(cat.current[i] === state[0].category){
        editCat.current.value = i+1;
      }
    }
    editDesc.current.value = state[0].description;
  }

  // everytime a new dropdown is chosen, update the input element
  function updateEdit(){
    // updates the dropdown for category
    editCat.current.value = 0;
    for(let i = 0; i < cat.current.length; i++){
      if(cat.current[i] === state[old.current.value].category){
        editCat.current.value = i+1;
      }
    }
    editName.current.value = state[old.current.value].name;
    editDesc.current.value = state[old.current.value].description;
  }

  return (
    <>
      <>
        <section className='taskSection'>
          <div className="taskCont">
            {/* used to navigate between the create and edit form */}
            <div className="taskBtn">
              <button onClick={()=>setCreateForm(true)} className='btn'>Create</button>
              <button onClick={()=>setCreateForm(false)} className='btn'>Edit</button>
            </div>

            {/* determines whether or not to show the create task page or the edit task page */}
            {createForm ? 
              <div className="createTask">
                {/* inputs for name and description */}
                <input ref={createName} placeholder='Name' className='input'/>
                <input ref={createDesc} placeholder='Description' className='input'/>
                <br />
                {/* makes sure that the user selects a valid category using a dropdown */}
                <label htmlFor="tasks" className='label'>Choose a Category:</label>
                <select name="tasks" id="tasks" ref={createCat} className='dropdown'>
                  <option value={0}>none</option>
                  {cat.current.map((t, i)=>{
                    return(
                      <option value={i+1} key={i}>{t}</option>
                    )
                  })}
                </select>
                <br />
                {/* create task */}
                <button onClick={createTask} className='createBtn'>Create Task</button>
                {/* displays exising tasks */}
                {state.map((t, i)=>{
                  return (
                    <p key={i}>{t.name}: {t.description} - {t.category}</p>
                  )
                })}
              </div> :

              <div className="editTask">
                {/* allows the user to select the desired task */}
                <label htmlFor="task" className='label'>Choose a Task:</label>
                <select name="task" id="task" ref={old} onChange={updateEdit} className='dropdown'>
                  {state.map((t, i)=>{
                    return(
                      <option value={i} key={i}>{t.name}</option>
                    )
                  })}
                </select>

                {/* inputs for editing */}
                <input placeholder='New Name' ref={editName} onChange={editTask} className='input'/>
                <input placeholder='New Description' ref={editDesc} onChange={editTask} className='input'/>
                {/* makes sure that the user selects a valid category by using a dropdown */}
                <br />
                <label htmlFor="tas" className='label'>Choose a Category:</label>
                <select name="tas" id="tas" ref={editCat} onChange={editTask}  className='dropdown'>
                  <option value={0}>none</option>
                  {cat.current.map((t, i)=>{
                    return(
                      <option value={i+1} key={i}>{t}</option>
                    )
                  })}
                </select>
                <br />
                {/* deletes the task */}
                <button onClick={deleteTask} className='deleteBtn'>Delete Category</button>
              </div>
            }
          </div>
        </section>
      </>
    </>
  )
}

export default Task;