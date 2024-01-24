// import {useReducer} from 'react';
import Category from './Components/Category';
import Task from './Components/Task';

function App() {
  let task = (localStorage.getItem('tasks') || []);
  let category = (localStorage.getItem('categories') || ['sure']);


  return (
    <div className='bodySection'>
      <Category categors={category}/>
      <Task tasks={task}/>
    </div>
  );
}

export default App;
