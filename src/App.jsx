import Category from './Components/Category';
import Task from './Components/Task';
import Item from  './Components/Item';
import {useState} from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

function App() {
  let task = (JSON.parse(sessionStorage.getItem('tasks')) || [{name: 'sure', category: "none", description: 'this is a test'}]);
  let category = (JSON.parse(sessionStorage.getItem('categories')) || ['sure']);
  const [sort, setSort] = useState(false);
  const [panel, setPanel] = useState(false);
  const [categoryForm, setCategoryForm] = useState(true)

  return (
    <div className='bodySection'>
      <div className="content">
        {/* opens the panel where the user can use the task and category forms */}
        {!panel ? <FaCirclePlus onClick={()=>setPanel(true)} className='openBtn'/> : 
          <>
            <IoCloseCircle onClick={()=>setPanel(false)} className='closeBtn'></IoCloseCircle>
            <div className='formSection'>
              <div className="decideBtn">
                <button onClick={()=>setCategoryForm(true)} className='btn'>Categories</button>
                <button onClick={()=>setCategoryForm(false)} className='btn'>Tasks</button>
              </div>
              <hr className='line'/>
              {/* determines which form should show */}
              {categoryForm ? <Category categors={category}/> : <Task tasks={task}/>}
            </div>
          </>
        }

        <div className="organizeCont">
          <button onClick={()=>setSort(true)} className='btn'>Sort by Category</button>
          <button onClick={()=>setSort(false)} className='btn'>Unsort</button>
        </div>
        {/* determines whether or not to sort the tasks by category */}
        {sort ? 
          <div className='cont'>
            <Item tasks={task} categors={category} type={true}></Item>
          </div> : 
          <div className='cont'>
            <Item tasks={task} categors={category} type={false}></Item>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
