import React from 'react'
import { useDispatch } from 'react-redux';

// Import Material UI icon
import AddIcon from '@mui/icons-material/Add';

// Import reducer
import { addNewTask , addNewColumn } from './taskSlice';

function TaskAddButton(props) {
  const colId = props.colId;
  const dispatch = useDispatch();

  function handleNewTask() {
    dispatch(addNewTask({colId: colId}));
  }
  function handleNewColumn() {
    dispatch(addNewColumn());
  
  }

  return (
    <div>
      <button style={{ color: "white", margin: '8px', backgroundColor: "#009D5E",fontSize: "20", borderRadius: "5px", border: "none", padding: "5px 10px 5px 5px", cursor: "pointer"}}
      className='add-task-button' onClick={colId ? handleNewTask : handleNewColumn}>
        <div 
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <AddIcon />
          {colId ? "Add a card" : "Add another List"}
        </div>
      </button>
    </div>
  )
}

export default TaskAddButton
