import React, { useEffect, useState } from 'react';

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [setTasks]);

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === newTask.id ? newTask : task
          )
        );
        setEditingTask(null);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Incomplete'}
            <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editTask(task)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingTask && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTask(editingTask);
          }}
        >
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={editingTask.completed}
              onChange={(e) =>
                setEditingTask({ ...editingTask, completed: e.target.checked })
              }
            />
            Completed
          </label>
          <button type="submit">Save</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default TaskList;