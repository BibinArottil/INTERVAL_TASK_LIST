import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../instance/axios";

function List() {
  const [lists, setLists] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const fetchAllList = async () => {
    await axios
      .get("/list")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/delete/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterTasksByPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const filteredTasks = lists.filter((task) => {
    if (selectedPriority === "all") {
      return true;
    } else {
      return task.priority === selectedPriority;
    }
  });

  useEffect(() => {
    fetchAllList();
  }, []);

  return (
    <div className="d-flex bg-primary vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="d-flex justify-content-between">
          <Link to="/add" className="btn btn-success">
            Add +
          </Link>
          <button
            className="btn btn-info"
            onClick={() => filterTasksByPriority("all")}
          >
            All
          </button>
          <button
            className="btn btn-info"
            onClick={() => filterTasksByPriority("L")}
          >
            Low
          </button>
          <button
            className="btn btn-info"
            onClick={() => filterTasksByPriority("M")}
          >
            Medium
          </button>
          <button
            className="btn btn-info"
            onClick={() => filterTasksByPriority("H")}
          >
            High
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>No:</th>
              <th>Image</th>
              <th>Heading</th>
              <th>Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img className="card-img" src={data.image} alt="" />
                </td>
                <td>{data.heading}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>{data.priority}</td>
                <td>
                  <Link to={`/view-task/${data.id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/update/${data.id}`}>
                    <button className="btn btn-secondary">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
