import {useReducer, useRef} from 'react'

const Category = (categors) => {
  console.log(categors)
  console.log(categors.categors)

  function reducer(state, action){
    console.log(state)
    console.log(action.newCat)
    switch(action.type){
      case 'create':
        sessionStorage.setItem('categories', [...state, action.newCat])
        return [...state, action.newCat];
      case 'edit':
        let id = state.findIndex(c=> c === action.editCat);
        state[id] = action.editCat;
        sessionStorage.setItem('categories', [...state]);
        return [...state];
    }
  }

  const [state, dispatch] = useReducer(reducer, categors.categors);
  const creating = useRef(null);
  const editing = useRef(null)

  function createCat(e){
    dispatch({type: 'create', newCat: creating.current.value});
  }

  function editCat(e){
    dispatch({type: 'edit', editCat: e.target.value});
  }

  return (
    <>
      <input placeholder='create' ref={creating}/>
      <button onClick={createCat}>Create Category</button>
      <input placeholder='edit' />
      <article>
        {state.map((category, i)=>{
          return(
            <h1 key={i}>{category}</h1>
          )
        })}
      </article>
      
    </>
  )
}

export default Category;