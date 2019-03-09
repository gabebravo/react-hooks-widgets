import React, { useState, useEffect } from "react";
const shortid = require("shortid");

const TASK_STORAGE_KEY = "TASK_STORAGE_KEY";

const storeTasks = (taskMap) => {
  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
};

const readStoreTasks = () => {
  const taskMap = JSON.parse(localStorage.getItem("TASK_STORAGE_KEY"));
  return taskMap ? taskMap : { tasks: [], completedTasks: [] }
};

export default function Tasks() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = readStoreTasks();
  const [tasks, setTasks] = useState(storedTasks.tasks);
  const [completedTasks, setCompletedText] = useState(storedTasks.completedTasks);

  useEffect( () => { // runs every re-render
    storeTasks({ tasks, completedTasks })
  })

  const updateTaskText = ev => {
    setTaskText(ev.target.value);
  };

  const addTask = () => {
    setTasks([...tasks, { taskText, id: shortid.generate() }]);
    setTaskText("");
  };

  const completeTask = completedTask => {
    setCompletedText([...completedTasks, completedTask]);
    setTasks(tasks.filter(task => task.id !== completedTask.id));
  };

  const removeTask = completedTask => {
    setCompletedText(
      completedTasks.filter(task => task.id !== completedTask.id)
    );
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
