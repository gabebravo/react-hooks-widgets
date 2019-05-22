import React, { useState, useEffect, useReducer } from "react";
const shortid = require("shortid");

const DEFAULT_STATE = {
  tasks: [],
  completedTasks: []
}

const TYPES = {
  ADD: 'ADD',
  COMPLETE: 'COMPLETE',
  DELETE: 'DELETE'
}

// state = state already there, action is the actual payload
const taskReducer = (state, action) => {
  switch(action.type){
    case 'ADD':
      return {
        ...state,
        tasks: [ ...state.tasks, action.task ]
      }
    case 'COMPLETE':
      const { completedTask } = action;
      return {
        ...state,
        completedTasks: [ ...state.completedTasks, completedTask ],
        tasks: state.tasks.filter(task => task.id !== completedTask.id)
      }
    case 'DELETE':
      return {
        ...state,
        completedTasks: state.completedTasks.filter(ct => ct.id !== action.completedTask.id)
      }
    default: 
      return state;
  }
}

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
};

const readStoreTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem("TASK_STORAGE_KEY"));
  return taskMap ? taskMap : DEFAULT_STATE
};

export default function Tasks() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = readStoreTasks();

  // takes a reducer and initial state as args
  const [state, dispatch] = useReducer(taskReducer, storedTasks);
  const { tasks, completedTasks } = state;

  useEffect( () => { // runs every re-render
    storeTasks({ tasks, completedTasks })
  })

  const updateTaskText = ev => {
    setTaskText(ev.target.value);
  };

  const addTask = () => {
    const ID = shortid.generate()
    dispatch({ type: TYPES.ADD, task: { taskText, id: ID } })
    setTaskText("");
  };

  const completeTask = completedTask => {
    dispatch({ type: TYPES.COMPLETE, completedTask })
  };

  const removeTask = completedTask => {
    dispatch({ type: TYPES.DELETE, completedTask })
  };

  const PendingTasks = () =>
    tasks.map(task => (
      <div key={task.id} onClick={() => completeTask(task)}>
        {task.taskText}
      </div>
    ));

  const CompletedTasks = () =>
    completedTasks.map(task => (
      <div key={task.id}>
        {task.taskText} <span onClick={() => removeTask(task)}>x</span>
      </div>
    ));

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <input
          value={taskText}
          onChange={updateTaskText}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        <PendingTasks />
      </div>
      <div className="completed-list">
        <CompletedTasks />
      </div>
    </div>
  );
}
