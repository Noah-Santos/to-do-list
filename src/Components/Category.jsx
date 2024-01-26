import {useReducer, useRef, useState} from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const Category = (categors) => {
  // const [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem('tasks')) || [{name: 'sure', category: "sure", description: 'this is a test'}])
  const tasks = useRef(null);
  tasks.current = JSON.parse(sessionStorage.getItem('tasks')) || [{name: 'sure', category: "none", description: 'this is a test'}];
  
  function reducer(state, action){
    // creates the category
    if(action.type === 'create'){
      sessionStorage.setItem('categories', JSON.stringify([...state, action.newCat]));
      return [...state, action.newCat];
    }
    // edits the category
    if(action.type === 'edit'){
      state[action.oldCat] = action.editCat;
      sessionStorage.setItem('categories', JSON.stringify([...state]));
      return [...state];
    }
    // deletes the category
    if(action.type === 'delete'){
      let newCats = state.filter((c, i)=> Number(i) !== Number(action.removeCat));
      sessionStorage.setItem('categories', JSON.stringify([...newCats]));

      // removes the deleted category from any task that had the category
      let newTasks = tasks.current.map(task=>{
        if(task.category == state[action.removeCat]){
          task = {name: task.name, description: task.description, category: 'none'};
        }
        return task;
      })
      sessionStorage.setItem('tasks', JSON.stringify([...newTasks]));
      return [...newCats];
    }
  }

  const [state, dispatch] = useReducer(reducer, categors.categors);
  const [panel, setPanel] = useState(false);
  const [createForm, setCreateForm] = useState(true);
  const creating = useRef(null);
  const editing = useRef(null);
  const old = useRef(null);

  // calls reducer function to create a category
  function createCat(){
    if(creating.current.value){
      dispatch({type: 'create', newCat: creating.current.value});
    }
    creating.current.value = '';
  }

  // calls reducer function to edit the category
  function editCat(){
    dispatch({type: 'edit', editCat: editing.current.value, oldCat: old.current.value});
  }

  // calls reducer function to delete the category
  function deleteCat(){
    dispatch({type: 'delete', removeCat: old.current.value});
    editing.current.value = state[0];
  }

  // everytime a new dropdown is chosen, update the input element
  function updateEdit(){
    editing.current.value = state[old.current.value];
  }

  return (
    <>
    {/* hides the category form until the plus button is clicked */}
      {/* {!panel ? <FaCirclePlus onClick={()=>setPanel(true)}/> :  */}
        <>
          <section className='categorySection'>
            {/* <IoCloseCircle onClick={()=>setPanel(false)}></IoCloseCircle> */}
            <div className="categoryCont">
              <div className="categoryBtn">
                <button onClick={()=>setCreateForm(true)}>Create</button>
                <button onClick={()=>setCreateForm(false)}>Edit</button>
              </div>
              {/* determines whether or not to show the create category page or the edit category page */}
              {createForm ? 
                <div className="createCat">
                  <input placeholder='create' ref={creating}/>
                  <button onClick={createCat}>Create Category</button>
                  <article>
                    {state.map((category, i)=>{
                      return(
                        <h1 key={i}>{category}</h1>
                      )
                    })}
                  </article>
                </div> :
                <div className="editCat">
                  <label htmlFor="categories">Choose a Category:</label>

                  <select name="categories" id="categories" ref={old} onChange={updateEdit}>
                    {state.map((category, i)=>{
                      return(
                        <option value={i} key={i}>{category}</option>
                      )
                    })}
                  </select>
                  <input placeholder='Edit' ref={editing} onChange={editCat}/>
                  <button onClick={deleteCat}>Delete Category</button>
                </div>
              }
            </div>
          </section>
        </>
      {/* }       */}
    </>
  )
}

export default Category;