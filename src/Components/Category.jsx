import {useReducer, useRef, useState} from 'react';
import { FaCirclePlus } from "react-icons/fa6";

const Category = (categors) => {
  console.log(categors)
  console.log(categors.categors)

  function reducer(state, action){
    console.log(state)
    console.log(action.newCat)
    if(action.type === 'create'){
      // sessionStorage.setItem('categories', [...state, action.newCat])
      return [...state, action.newCat];
    }
    if(action.type === 'edit'){
      let id = state.findIndex(c=> {
        console.log(c)
        console.log(action.oldCat)
        if(c === action.oldCat){
          return c
        }
      });
      console.log(id)
      state[id] = action.editCat;
      // sessionStorage.setItem('categories', [...state]);
      return [...state];
    }
  }

  const [state, dispatch] = useReducer(reducer, categors.categors);
  const [panel, setPanel] = useState(false);
  const [createForm, setCreateForm] = useState(true);
  const creating = useRef(null);
  const editing = useRef(null);
  const old = useRef(null);

  function createCat(e){
    dispatch({type: 'create', newCat: creating.current.value});
  }

  function editCat(e){
    dispatch({type: 'edit', editCat: editing.current.value, oldCat: old.current.value});
  }

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

                  <select name="categories" id="categories" ref={old}>
                    {state.map((category, i)=>{
                      return(
                        <option value={category} key={i}>{category}</option>
                      )
                    })}
                  </select>
                  <input placeholder='Edit' ref={editing}/>
                  <button onClick={editCat}>Edit Category</button>
                </div>
              }
            </div>
          </section>
        </>}      
    </>
  )
}

export default Category;