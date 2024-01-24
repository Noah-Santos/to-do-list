import {useReducer} from 'react'

const Change = (tasks, categors) => {
    console.log(tasks)
    console.log(categors)
    // updates the tasks
    function reducer(state, action){
        console.log(state)
        switch(action.type){
            // creates the task
            case 'create':
                let hasCat = action.newCategory !== undefined;
                let newTask = {name: action.name, description: action.description, category: hasCat ? action.category : 'none', id:state.length+1};
                return {...state, newTask};
            // edits the task
            case 'edit' :
                let newCat = action.newCategory !== undefined;
                let id = state.map((s, i)=>{
                    if(s.id === action.id){
                        return i;
                    }
                });
                state[id] = {...state[id], name: action.newName, description: action.newDescription, category: newCat ? action.category : 'none'};
                return {...state};
        }
    }

    // updates the categories
    function reducerCategories(state, action){
        switch(action.type){
            // creates the category
            case 'create':
                let newList = [...state, action.category];
                return {newList};
            // edits the category
            case 'edit' :
                let id = state.map((c, i)=>{
                    if(c.name === action.originalName){
                        return i;
                    }
                });
                state[id] = action.newName;
                return {...state};
        }
        
    }

    const [state, dispatch] = useReducer(reducer, tasks);
    const [categories, change] = useReducer(reducerCategories, categors);

    return (
        <>
            <button onClick={()=>dispatch({type: 'create'})}>Task Create</button>
            <button onClick={()=>dispatch({type: 'edit'})}>Task Edit</button>
            <button onClick={()=>change({type: 'create'})}>Category Create</button>
            <button onClick={()=>change({type: 'edit'})}>Category Edit</button>
        </>
    )
}

export default Change;