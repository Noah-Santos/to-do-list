import Category from './Components/Category';
import Task from './Components/Task';
import Item from  './Components/Item';
import {useState} from 'react';

function App() {
  let task = (JSON.parse(sessionStorage.getItem('tasks')) || [{name: 'sure', category: "none", description: 'this is a test'}]);
  let category = (JSON.parse(sessionStorage.getItem('categories')) || ['sure']);
  const [sort, setSort] = useState(false);
  // console.log(task)

  return (
    <div className='bodySection'>
      <Category categors={category}/>
      <Task tasks={task}/>
      <div className="content">
        {/* determines whether or not to sort the takss by category */}
        {sort ? 
          <div>

          </div> : 
          <div>

          </div>
        }
        {/* {task.map((t, i)=>{
          return (
            <Item key={i} tasks={t}></Item>
          )
        })} */}
      </div>
    </div>
  );
}

export default App;
