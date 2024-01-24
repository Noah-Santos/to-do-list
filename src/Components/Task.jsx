import React from 'react'

const Task = (tasks, categors) => {
    console.log(tasks)
    console.log(categors)
    // updates the tasks
    function reducer(state, action){
        let newCat = action.newCategory !== undefined;
        let id = state.map((s, i)=>{
            if(s.id === action.id){
                return i;
            }
        });
        state[id] = {...state[id], name: action.newName, description: action.newDescription, category: newCat ? action.category : 'none'};
        return {...state};
    }

    // updates the categories
    function reducerCategories(state, action){
        let id = state.map((c, i)=>{
            if(c.name === action.originalName){
                return i;
            }
        });
        state[id] = action.newName;
        return {...state};
    }

    const [state, dispatch] = useReducer(reducer, tasks);
    const [categories, change] = useReducer(reducerCategories, categors);

    return (
        <>
            <button onClick={()=>dispatch({type: 'edit'})}>Task Edit</button>
            <button onClick={()=>change({type: 'edit'})}>Category Edit</button>
        </>
    )
}

export default Task;