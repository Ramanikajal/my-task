import "./task .css"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './Redux/actions';

function App() {
  const [taskname, setTaskname] = useState("");
  const [editItem, setEditItem] = useState(null);
  // const [showvalue, setShowvalue] = useState([]);
  // const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { showvalue, filter } = useSelector(state => state);

  const getData = () => {
    let data = JSON.parse(localStorage.getItem("datacrud")) || [];
    dispatch({ type: 'SET_SHOW_VALUE', payload: data });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const updatedData = showvalue.filter((item) => item.id !== id);
    updateLocalStorage(updatedData);
  };


  const handleEdit = (item) => {
    setEditItem(item);
    setTaskname(item.taskname);
  };

  const handleToggleComplete = (id) => {
    const updatedData = showvalue.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    updateLocalStorage(updatedData);
  };


  const handleSubmitAll = (event) => {
    event.preventDefault();

    if (!taskname.trim()) {
      setError("Task name cannot be empty");
      return;
    }

    const data = {
      taskname: taskname,
      completed: false,
    };

    data.id = editItem ? editItem.id : Math.floor(Math.random() * 10000);

    if (editItem) {
      const updatedData = showvalue.map((item) =>
        item.id === editItem.id ? { ...item, ...data } : item
      );
      updateLocalStorage(updatedData);
      setEditItem(null);
    } else {
      const updatedData = [...showvalue, data];
      updateLocalStorage(updatedData);
    }
    setError("");
    setTaskname("");
  };


  const handleFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem("datacrud", JSON.stringify(data));
    dispatch({ type: 'SET_SHOW_VALUE', payload: data });
  };

  const filteredData = showvalue.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "uncompleted") return !item.completed;
    return true; // 'all' filter
  });

  return (
    <div className="container ">
      <div className="text-center  Task_heding"> TO DO TASK </div>
      <div className="row">
        <div className="col-md-6 mt-4 mb-4">
          <form onSubmit={handleSubmitAll} className="bg-light p-3 rounded">
            <div className="form-group">
              <label htmlFor="taskname"  className="task_titel">Task Name</label>
              <input
                className="form-control"
                name="taskname"
                type="text"
                placeholder="Enter task"
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary" type="submit">
                Add Task
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="col-md-6">
          <div className="btn-group mt-3">
            <button
              className={`btn btn-secondary ${
                filter === "all" ? "active" : ""
              }`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={`btn btn-success ${
                filter === "completed" ? "active" : ""
              }`}
              onClick={() => handleFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`btn btn-warning ${
                filter === "uncompleted" ? "active" : ""
              }`}
              onClick={() => handleFilter("uncompleted")}
            >
              Uncompleted
            </button>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Task Name</th>
                  <th>Completed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, inx) => (
                  <tr key={inx}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.taskname}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleComplete(item.id)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      {editItem === null ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button className="btn btn-success" disabled>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


