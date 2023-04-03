// Create the Column component here
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import TaskAddButton from './TaskAddButton'
import  {updateColumn, deleteColumn} from './taskSlice';
import ClearIcon from '@mui/icons-material/Clear';

function Column({colId, index}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task);
  const [title , setTitle]= useState(data.columns[colId].title)
  const titleHandle=(e)=>{
setTitle(e.target.value);
dispatch(updateColumn({id: colId, title: title}));
  }
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
          <div ref={provided.innerRef} {...provided.draggableProps} className="column-container">
            <div className='task-title-edit-container'>
              <span {...provided.dragHandleProps} className="column-title"><input style={{border: 'none'}} 
              type="text" value={title} onChange={titleHandle}/></span>
              <ClearIcon onClick={handleDeleteButtonClick}></ClearIcon>
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