// Create the Column component here
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import TaskAddButton from './TaskAddButton'
import  {updateColumn, deleteColumn} from './taskSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Column({colId, index}) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task);
  const [title , setTitle]= useState(data.columns[colId].title)
  useEffect((()=>{
    dispatch(updateColumn({id: colId, title: title}));
  }),[title])

  const titleHandle=(e)=>{
setTitle(e.target.value);
  }
  
  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDeleteButtonClick =()=>{
    dispatch(deleteColumn({id: colId}))
  }
  function RenderColumnTasks() {
    const currColTasks = data.columns[colId].taskIds.map(taskId => data.tasks[taskId]);
    
    return (
      <>
        {
          currColTasks.map((task, index) => {
            
            return <TaskCard key={task.id} currTaskColId={colId} task={task} index={index}/>
          })
        }
      </>
    )
  }

  return (
    <>
      <Draggable draggableId={colId} index={index}>
        {(provided) => (
          <div {...provided.dragHandleProps} ref={provided.innerRef} {...provided.draggableProps} className="column-container">
            <div className='task-title-edit-container'>
              <span  className="column-title"><input style={{border: 'none'}} 
              type="text" value={title} onChange={titleHandle}/></span>
      <div>
      <MoreVertIcon onClick={handleMenuButtonClick} />
      {showMenu && (
        <div>
          <button onClick={handleDeleteButtonClick}>Delete</button>
          {/* Add more menu items here */}
        </div>
      )}
    </div>
            </div>
            <Droppable droppableId={colId} type='task'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
                  <RenderColumnTasks />
                  {provided.placeholder}
                  
                  <TaskAddButton colId={colId}/>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default Column