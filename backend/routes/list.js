const router = require("express").Router();

const list = require("../controllers/showList");
router.get("/list", list.showList);
router.post("/add-task", list.Task);
router.get("/view-task/:id", list.viewTask);
router.patch("/update/:id", list.updateTask);
router.delete("/delete/:id", list.deleteTask);

module.exports = router;
