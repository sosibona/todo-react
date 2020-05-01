import React, { Component } from "react";
import Task from "./Task";
import CreateTaskInput from "./CreateTaskInput";
import {
  createTask,
  fetchTasksList,
  updateTask,
  deleteTask,
} from "./taskGateway";

class TasksList extends Component {
  state = {
    tasks: [],
    // { id: "1", done: false, text: "text 1" },
    // { id: "2", done: false, text: "text 2" },
    // { id: "3", done: false, text: "text 3" },
    // { id: "4", done: false, text: "text 4" },
    // { id: "5", done: true, text: "text 5" },
    // { id: "6", done: true, text: "text 6" },
  };

  componentDidMount() {
    this.fetchTask();
  }

  fetchTask = () => {
    fetchTasksList().then((taskList) => {
      console.log(taskList);
      return this.setState({
        tasks: taskList,
      });
    });
  };

  onCreate = (text) => {
    const newTask = {
      text,
      done: false,
    };

    createTask(newTask).then(() => this.fetchTask());
  };

  handleTaskStatusChange = (id) => {
    const { done, text } = this.state.tasks.find((task) => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };
    updateTask(id, updatedTask).then(() => this.fetchTask());
  };

  handleTaskDelete = (id) => {
    deleteTask(id).then(() => this.fetchTask());
  };

  render() {
    const sortedTask = this.state.tasks.slice().sort((a, b) => a.done - b.done);
    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedTask.map((task) => {
            return (
              <Task
                key={task.id}
                {...task}
                onChange={this.handleTaskStatusChange}
                onDelete={this.handleTaskDelete}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TasksList;
