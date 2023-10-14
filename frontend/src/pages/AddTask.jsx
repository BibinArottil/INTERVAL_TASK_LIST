import axio from "../instance/axios";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddList = () => {
  const currentDate = new Date();
  const date = currentDate.toISOString().split("T")[0];
  const time = currentDate.toISOString().split("T")[1].split(".")[0];
  const navigate = useNavigate();
  const [list, setList] = useState({
    heading: "",
    description: "",
    date: date,
    time: time,
    image: "",
    priority: "",
  });

  console.log(list);

  const presetKey = "vdbevfmo";
  const cloudName = "ds79wb3yq";

  const handleImage = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      alert("Format is not supported");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);
    axios
      .post("https://api.cloudinary.com/v1_1/ds79wb3yq/image/upload", formData)
      .then((res) => {
        const url = res.data.secure_url;
        list.image = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axio.post("/add-task", list);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2>Add Task</h2>
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
              name="photo"
              onChange={handleImage}
              required
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddList;
