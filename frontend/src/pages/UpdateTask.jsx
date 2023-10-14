import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../instance/axios";

const UpdateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];
  const [list, setList] = useState({
    heading: "",
    description: "",
    image: "",
    priority: "",
  });

  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch("/update/" + taskId, list);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2>Update Task</h2>
          <div className="mb-2">
            <label>Heading</label>
            <input
              type="text"
              placeholder="Enter heading"
              className="form-control"
              name="heading"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter Description"
              className="form-control"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex">
            <div className="m-2">
              <input
                type="checkbox"
                value="L"
                name="priority"
                onChange={handleChange}
                required
              />
              <label for="lowCheckbox">Low</label>
            </div>
            <div className="m-2">
              <input
                type="checkbox"
                value="M"
                name="priority"
                onChange={handleChange}
              />
              <label for="mediumCheckbox">Medium</label>
            </div>
            <div className="m-2">
              <input
                type="checkbox"
                value="H"
                name="priority"
                onChange={handleChange}
              />
              <label for="highCheckbox">High</label>
            </div>
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
