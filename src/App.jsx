// import {useReducer} from 'react';
import Create from './Components/Create';

function App() {
  let task = (localStorage.getItem('tasks') || []);
  let category = (localStorage.getItem('categories') || []);


  return (
    <div>
      <Create tasks={task} categors={category}/>
    </div>
  );
}

export default App;
