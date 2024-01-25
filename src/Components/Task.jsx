import {useReducer, useState, useRef} from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const Task = (tasks, categors) => {
  console.log(categors)
  console.log(JSON.parse(sessionStorage.getItem('categories')))
  const cat = useRef(null)
  cat.current = (JSON.parse(sessionStorage.getItem('categories')));
  console.log(cat.current)
  
  function reducer(state, action){
    // creates the task
    if(action.type === 'create'){
      let newTask = {name: action.tasName, category: action.tasCat, description: action.tasDesc}
      sessionStorage.setItem('tasks', JSON.stringify([...state, newTask]));
      return [...state, newTask];
    }
    // edits the task
    if(action.type === 'edit'){
      console.log(action.changeCat)
      console.log(cat.current)
      console.log(cat.current[action.changeCat])
      state[action.oldTas] = {name: action.changeName, category: cat.current[action.changeCat], description: action.changeDesc}
      sessionStorage.setItem('tasks', JSON.stringify([...state]));
      return [...state];
    }
    // deletes the task
    if(action.type === 'delete'){
      let newTasks = state.filter((c, i)=> Number(i) !== Number(action.removeTas));
      sessionStorage.setItem('tasks', JSON.stringify([...newTasks]));
      return [...newTasks];
    }
    return [...state];
  }

  function first(){

  }

  const [state, dispatch] = useReducer(reducer, tasks.tasks);
  const [panel, setPanel] = useState(false);
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
    createName.current.value = '';
    createCat.current.value = '';
    createDesc.current.value = '';
  }

  // calls reducer function to edit the task
  function editTask(){
    console.log(editCat.current.value)
    dispatch({type: 'edit', changeName: editName.current.value, changeCat: editCat.current.value, changeDesc: editDesc.current.value, oldTas: old.current.value});
  }

  // calls reducer function to delete the task
  function deleteTask(){
    dispatch({type: 'delete', removeTas: old.current.value});
    editName.current.value = state[0].name;
    editCat.current.value = state[0].category;
    editDesc.current.value = state[0].description;
  }

  // everytime a new dropdown is chosen, update the input element
  function updateEdit(){
    editName.current.value = state[old.current.value].name;
    editCat.current.value = state[old.current.value].category;
    editDesc.current.value = state[old.current.value].description;
  }

  return (
    <>
    {/* hides the task form until the plus button is clicked */}
      {!panel ? <FaCirclePlus onClick={()=>setPanel(true)}/> : 
        <>
          <section className='categorySection'>
            <IoCloseCircle onClick={()=>setPanel(false)}></IoCloseCircle>
            <div className="categoryCont">
              <div className="categoryBtn">
                <button onClick={()=>setCreateForm(true)}>Create</button>
                <button onClick={()=>setCreateForm(false)}>Edit</button>
              </div>
              {/* determines whether or not to show the create task page or the edit task page */}
              {createForm ? 
                <div className="createCat">
                  <input ref={createName} placeholder='Name'/>
                  <input ref={createDesc} placeholder='Description'/>
                  <input ref={createCat} placeholder='Category'/>
                  <button onClick={createTask}>Create Task</button>
                  {state.map((t, i)=>{
                    return (
                      <h1 key={i}>{t.name}: {t.description} - {t.category}</h1>
                    )
                  })}
                </div> :
                <div className="editCat">
                  <label htmlFor="categories">Choose a Task:</label>

                  <select name="categories" id="categories" ref={old} onChange={updateEdit}>
                    {state.map((t, i)=>{
                      return(
                        <option value={i} key={i}>{t.name}</option>
                      )
                    })}
                  </select>

                  <input placeholder='Edit' ref={editName} onChange={editTask}/>
                  {/* <input placeholder='Edit' ref={editCat} onChange={editTask}/> */}
                  <input placeholder='Edit' ref={editDesc} onChange={editTask}/>
                  <label htmlFor="categories">Choose a Category:</label>

                  <select name="categories" id="categories" ref={editCat} onChange={()=>{updateEdit(); editTask();}}>
                    {cat.current.map((t, i)=>{
                      return(
                        <option value={i} key={i}>{t}</option>
                      )
                    })}
                  </select>
                  <button onClick={deleteTask}>Delete Category</button>
                </div>
              }
            </div>
          </section>
        </>}      
    </>
  )
}

export default Task;