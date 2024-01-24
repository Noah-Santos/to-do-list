import {useReducer} from 'react'

const Create = (tasks, categors) => {
    console.log(tasks)
    console.log(categors)
    // updates the tasks
    function reducer(state, action){
        let hasCat = action.newCategory !== undefined;
        let newTask = {name: action.name, description: action.description, category: hasCat ? action.category : 'none', id:state.length+1};
        return {...state, newTask};
    }

    // updates the categories
    function reducerCategories(state, action){
        console.log(state.categories)
        let arr = [...state.categories] || [];
        console.log(arr)
        return {categories: arr.push(action.newCategory)};
    }

    const [state, dispatch] = useReducer(reducer, tasks);
    const [categories, change] = useReducer(reducerCategories, (categors || []));

    return (
        <>
            <button onClick={()=>dispatch({type: 'create'})}>Task Create</button>
            <button onClick={()=>change({type: 'create'})}>Category Create</button>
        </>
    )
}

export default Create;