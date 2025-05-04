import React, { useState } from 'react';

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');

  const addTask = (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }), // Send the task title to the backend
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the state
        setTitle(''); // Clear the input field
      });
  };

  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;