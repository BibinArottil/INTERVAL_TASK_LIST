import React, { useEffect, useState } from "react";
import axios from "../instance/axios";
import { Link, useLocation } from "react-router-dom";

const ViewTask = () => {
  const [task, setTask] = useState({});
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];
  console.log(taskId);
  useEffect(() => {
    ViewTask();
  }, []);

  const ViewTask = async () => {
    await axios.get("/view-task/" + taskId).then(({ data }) => {
      setTask(...data);
    });
  };
  const currentDate = task.date;
  const date = new Date(currentDate);
  const formattedDate = date.toLocaleDateString();

  console.log(date);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h1>{task.heading}</h1>
        <p>{task.description}</p>
        <p>{formattedDate}</p>
        <p>{task.time}</p>
        <img
          src={task.image}
          alt="cover"
          style={{ width: "300px", height: "250px" }}
        />{" "}
        <br />
        <Link to="/">
          <button className="btn btn-success">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewTask;
