// import {useReducer} from 'react';
import Category from './Components/Category';
import Task from './Components/Task';

function App() {
  let task = (localStorage.getItem('tasks') || [{name: 'sure', category: "sure", description: 'this is a test'}]);
  let category = (localStorage.getItem('categories') || ['sure']);


  return (
    <div className='bodySection'>
      <Category categors={category}/>
      <Task tasks={task}/>
    </div>
  );
}

export default App;
