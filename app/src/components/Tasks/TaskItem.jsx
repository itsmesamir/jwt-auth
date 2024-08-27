import React from "react";
import PropTypes from "prop-types";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    updateTask(task.id, updatedTask);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <li className={`list-group-item ${task.completed ? "completed" : ""}`}>
      <span>{task.name}</span>
      <button onClick={handleUpdate} className="btn btn-secondary btn-sm">
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
