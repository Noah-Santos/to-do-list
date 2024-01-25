// import {useReducer} from 'react';
import Category from './Components/Category';
import Task from './Components/Task';

function App() {
  let task = (JSON.parse(sessionStorage.getItem('tasks')) || [{name: 'sure', category: "sure", description: 'this is a test'}]);
  let category = (JSON.parse(sessionStorage.getItem('categories')) || ['sure']);


  return (
    <div className='bodySection'>
      <Category categors={category}/>
      <Task tasks={task} categors={category}/>
    </div>
  );
}

export default App;
