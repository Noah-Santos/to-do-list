// import {useReducer} from 'react';
import Category from './Components/Category';

function App() {
  let task = (localStorage.getItem('tasks') || []);
  let category = (localStorage.getItem('categories') || ['sure']);


  return (
    <div className='bodySection'>
      <Category categors={category}/>
    </div>
  );
}

export default App;
