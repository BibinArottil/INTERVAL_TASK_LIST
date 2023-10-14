const db = require("../config/dbConfig");

exports.showList = (req, res) => {
  try {
    const q = "SELECT * FROM lists ORDER BY date ASC";

    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.Task = (req, res) => {
  try {
    const q =
      "INSERT INTO lists (`heading`,`description`,`date`,`time`,`image`,`priority`) VALUES(?)";
    const values = [
      req.body.heading,
      req.body.description,
      req.body.date,
      req.body.time,
      req.body.image,
      req.body.priority,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("data saved successfully");
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.viewTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const q = "SELECT * FROM lists WHERE id = ?";

    db.query(q, [taskId], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const q =
      "UPDATE lists SET `heading`=?,`description`=?,`image`=?, `priority`=? WHERE id = ?";
    const values = [
      req.body.heading,
      req.body.description,
      req.body.image,
      req.body.priority,
    ];

    db.query(q, [...values, taskId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Task updated");
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const q = "DELETE FROM lists WHERE id = ?";

    db.query(q, [taskId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Task deleted");
    });
  } catch (error) {
    console.log(error.message);
  }
};
