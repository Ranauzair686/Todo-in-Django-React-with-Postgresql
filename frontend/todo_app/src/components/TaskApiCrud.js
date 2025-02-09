import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:8000/api/task/";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: "", details: "", deadline_date: "" });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response  = await axios.get(API_URL);
    setTasks(response.data);
  };

  const handleChange = (e) => { 
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`${API_URL}${editId}/`, task);
    } else {
      await axios.post(API_URL, task);
    }
    setTask({ name: "", details: "", deadline_date: "" });
    setEditing(false);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTask(task);
    setEditing(true);
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchTasks();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task Manager</h1>
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <input type="text" name="name" value={task.name} onChange={handleChange} placeholder="Task Name" className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="text" name="details" value={task.details} onChange={handleChange} placeholder="Details" className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="date" name="deadline_date" value={task.deadline_date} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editing ? "Update" : "Add"} Task
        </button>
      </form>
      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.details}</td>
              <td>{task.deadline_date}</td>
              <td>
                <button onClick={() => handleEdit(task)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}