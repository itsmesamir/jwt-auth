import React from "react";
import TaskItem from "./TaskItem";

import PropTypes from "prop-types";

const TaskList = ({ tasks = [], updateTask, deleteTask }) => {
  return (
    <div>
      <h3>Your Tasks</h3>
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

// default props
TaskList.defaultProps = {
  tasks: [],
};

export default TaskList;
