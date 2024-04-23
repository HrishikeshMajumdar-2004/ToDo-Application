import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    // This ensures that this inside the fetchTasks method refers to the component instance when it's called.This is necessary because in JavaScript, methods lose their original context when passed as callbacks or assigned to other variables.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeUnstrike = this.strikeUnstrike.bind(this);
  }

  // this function allows us to retrieve the value of a cookie by its name from the document.cookie string. It's commonly used for obtaining CSRF tokens or other stored data from cookies in web applications.
  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // The componentWillMount() lifecycle method is invoked by React just before mounting (rendering) occurs for the component ensuring that the UI reflects the most up-to-date task information
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log("Fetching...");

    // this code fetches a list of tasks from a specified API endpoint, parses the JSON response, and then updates the state of the component with the retrieved data.
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todoList: data,
        })
      );
    //This code snippet fetches a list of tasks from the specified API endpoint, parses the JSON response, and updates the component's state with the retrieved task data. Once the state is updated, React will re-render the component to reflect the changes, typically updating the UI to display the fetched tasks.
  }

  // handleChange is a function used to update the state of a React component when the value of an input field changes. It extracts the name and value of the input field from the event object, logs them for debugging purposes, and then updates the component's state with the new value.
  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    console.log("Name:", name);
    console.log("Value:", value);

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  }

  // handleSubmit is responsible for submitting form data to an API endpoint, handling success and error responses, and updating the component's state accordingly, providing a seamless user experience in the React application.
  handleSubmit(e) {
    e.preventDefault();
    console.log("ITEM:", this.state.activeItem);

    var csrftoken = this.getCookie("csrftoken");

    var url = "http://127.0.0.1:8000/api/task-create/";

    if (this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }

    // fetch(url, { ... }): Initiates an HTTP POST request to the specified URL with configurable options.
    // headers: { ... }: Contains HTTP headers, including content type and CSRF token, for security and data format specification.
    // body: JSON.stringify(this.state.activeItem): converts the activeItem object from the component's state into a JSON string, which is then sent as the request body.
    // .then((response) => { ... }): Handles successful response by fetching updated task data and resetting form state.
    // .catch(function (error) { ... }): Handles errors that may occur during the request by logging them for debugging.
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            title: "",
            completed: false,
          },
        });
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  }

  startEdit(task) {
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  // deleteItem is responsible for sending a DELETE request to the API endpoint for deleting a specific task. After successfully deleting the task, it may trigger additional actions to update the UI to reflect the changes, providing a smooth user experience in the React application.
  deleteItem(task) {
    var csrftoken = this.getCookie("csrftoken");

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    }).then((response) => {
      this.fetchTasks();
    });
  }

  // strikeUnstrike is responsible for toggling the completion status of a task, updating it via an API call, and updating the UI to reflect the changes. It ensures that the task's completion status is synchronized between the client and the server, providing a seamless user experience in the React application.
  strikeUnstrike(task) {
    task.completed = !task.completed;
    var csrftoken = this.getCookie("csrftoken");
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ completed: task.completed, title: task.title }),
    }).then(() => {
      this.fetchTasks();
    });

    console.log("TASK:", task.completed);
  }

  render() {
    var tasks = this.state.todoList;
    var self = this;
    return (
      <div className="container">
        <div className="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    id="title"
                    value={this.state.activeItem.title}
                    type="text"
                    name="title"
                    placeholder="Add task.."
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            {/* this code dynamically generates a list of tasks with options to edit, delete, and mark tasks as completed or incomplete based on their status. */}
            {tasks.map(function (task, index) {
              return (
                <div key={index} className="task-wrapper flex-wrapper">
                  <div
                    onClick={() => self.strikeUnstrike(task)}
                    style={{ flex: 7 }}
                  >
                    {task.completed === false ? (
                      <span>{task.title}</span>
                    ) : (
                      <strike>{task.title}</strike>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => self.startEdit(task)}
                      className="btn btn-sm btn-outline-info"
                    >
                      Edit
                    </button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => self.deleteItem(task)}
                      className="btn btn-sm btn-outline-dark delete"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
