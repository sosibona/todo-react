import React, { Component } from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import CreateTaskInput from "./CreateTaskInput";
import { connect } from "react-redux";
import * as tasksActions from "../tasks.actions";
import { taskListSelector } from "../tasks.selectors";

class TasksList extends Component {
  componentDidMount() {
    this.props.getTaskList();
  }

  render() {
    const sortedTask = this.props.tasks.slice().sort((a, b) => a.done - b.done);
    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.props.crateTask} />
        <ul className="list">
          {sortedTask.map((task) => {
            return (
              <Task
                key={task.id}
                {...task}
                onChange={this.props.updateTask}
                onDelete={this.props.deleteTask}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    tasks: taskListSelector(state),
  };
};

const mapDispatch = {
  getTaskList: tasksActions.getTaskList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  crateTask: tasksActions.crateTask,
};

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  getTaskList: PropTypes.func.isRequired,
  crateTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(TasksList);
