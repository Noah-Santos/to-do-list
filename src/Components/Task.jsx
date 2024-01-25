import {useReducer, useState, useRef} from 'react';
import { FaCirclePlus } from "react-icons/fa6";

const Task = (tasks) => {
  console.log(tasks)
  function reducer(state, action){
    console.log(state)
    console.log(action.newTas)
    // creates the task
    if(action.type === 'create'){
      // sessionStorage.setItem('categories', [...state, action.newCat])
      let newTask = {name: action.tasName, category: action.tasCat, description: action.tasDesc}
      return [...state, newTask];
    }
    // edits the task
    // if(action.type === 'edit'){
    //   state[action.oldTas] = action.editTas;
    //   // sessionStorage.setItem('categories', [...state]);
    //   return [...state];
    // }
    // // deletes the task
    // if(action.type === 'delete'){
    //   let newTasks = state.filter((c, i)=> i != action.removeTas);
    //   console.log(newTasks)
    //   return [...newTasks];
    // }
  }

  const [state, dispatch] = useReducer(reducer, tasks.tasks);
  const [panel, setPanel] = useState(false);
  const [createForm, setCreateForm] = useState(true);
  const createName = useRef(null);
  const createCat = useRef(null);
  const createDesc = useRef(null);

  // calls reducer function to create a task
  function createTask(){
    dispatch({type: 'create', tasName: createName.current.value, tasCat: createCat.current.value, tasDesc: createDesc.current.value});
    createName.current.value = '';
    createCat.current.value = '';
    createDesc.current.value = '';
  }

  // // calls reducer function to edit the task
  // function editTask(){
  //   dispatch({type: 'edit', editTas: editing.current.value, oldTas: old.current.value});
  // }

  // // calls reducer function to delete the task
  // function deleteTask(){
  //   dispatch({type: 'delete', removeTas: old.current.value});
  // }

  // // everytime a new dropdown is chosen, update the input element
  // function updateEdit(){
  //   console.log(old.current.value);
  //   editing.current.value = state[old.current.value];
  // }

  return (
    <>
    {/* hides the category form until the plus button is clicked */}
      {!panel ? <FaCirclePlus onClick={()=>setPanel(true)}/> : 
        <>
          <section className='categorySection'>
            <div className="categoryCont">
              <div className="categoryBtn">
                <button onClick={()=>setCreateForm(true)}>Create</button>
                <button onClick={()=>setCreateForm(false)}>Edit</button>
              </div>
              {/* determines whether or not to show the create category page or the edit category page */}
              {createForm ? 
                <div className="createCat">
                  <input ref={createName} placeholder='Name'/>
                  <input ref={createCat} placeholder='Category'/>
                  <input ref={createDesc} placeholder='Description'/>
                  <button onClick={createTask}>Create Task</button>
                  {state.map((t, i)=>{
                    return (
                      <h1 key={i}>{t.name}: {t.description} - {t.category}</h1>
                    )
                  })}
                </div> :
                <div className="editCat">
                  
                </div>
              }
            </div>
          </section>
        </>}      
    </>
  )
}

export default Task;