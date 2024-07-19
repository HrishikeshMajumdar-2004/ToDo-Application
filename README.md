# ToDo-Application

The ToDo application, built with Django Rest Framework, provides an efficient solution for managing tasks via a RESTful API. It seamlessly supports all CRUD operations.

**/api endpoint:**

![Screenshot 2024-07-19 205136](https://github.com/user-attachments/assets/160d3c94-59a2-4c43-8a26-dcfc843dc22b)

**/api/task-list/ endpoint:**

![Screenshot 2024-07-19 205148](https://github.com/user-attachments/assets/681a696a-ef6d-46a7-a3c6-8bbfb7848285)

**Front-end:**

The provided code is a React application that interacts with a Django backend through a RESTful API. It enables users to manage tasks with functionalities such as adding new tasks, editing existing ones, marking tasks as completed or incomplete, and deleting tasks. Here's a summary of its key aspects:

1. State Management: The application uses React's state to manage `todoList` (array of tasks), `activeItem` (current task being edited or added), and `editing` (boolean flag indicating if an edit operation is ongoing).

2. Lifecycle Methods: The `componentDidMount` method is utilized to fetch the initial list of tasks (`todoList`) from the Django API when the component mounts.

3. CRUD Operations: 
   - Create: Users can add new tasks through a form. On submission, the task is sent to the Django API via a POST request.
   - Read: Tasks are fetched from the Django API using a GET request and displayed dynamically in the UI.
   - Update: Tasks can be edited; upon submission of changes, an update request (PUT or POST depending on the context) is sent to the API.
   - Delete: Users can delete tasks by clicking a delete button associated with each task. This triggers a DELETE request to the Django API.

4. Event Handling: 
   - `handleChange` handles changes in the input fields, updating the `activeItem` state.
   - `handleSubmit` manages form submission, sending data to the API and handling success or error responses.
   - `strikeUnstrike` toggles the completion status of tasks and updates it via API call.

5. User Interface: 
   - The UI displays tasks in a list format.
   - Each task item includes options to mark as completed (with a strike-through), edit, and delete.

6. Security: The application ensures CSRF protection by fetching and including the CSRF token (`csrftoken`) in API requests where necessary.

Overall, this React application provides a user-friendly interface for managing tasks, utilizing React's component-based architecture and handling data interaction with a Django backend via RESTful API endpoints.

Below is a demonstration of an user performing actions of the ToDo list : 

https://github.com/user-attachments/assets/331071f0-fac3-4a94-8bad-351763670331
