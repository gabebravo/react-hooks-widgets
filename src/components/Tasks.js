import React, { useState } from "react";
const shortid = require("shortid");

export default function Tasks() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedText] = useState([]);

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
    setCompletedText(completedTasks.filter(task => task.id !== completedTask.id));
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
        {task.taskText}{' '}
        <span onClick={() => removeTask(task)}>x</span>
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
