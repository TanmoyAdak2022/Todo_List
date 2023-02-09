const { v4: uuidv4 } = require("uuid");

let taskList = [];

exports.getTasks = (req, res) => {
  res.status(200).json({ status: "success", data: taskList });
};

exports.updateTask = (req, res) => {
  let id = req.params.id;
  let task = taskList.find((t) => t.id === id);
  if (task) {
    task.isActive = req.body.isActive;
    task.isCompleted = req.body.isCompleted;
    res.status(200).json({ status: "success", data: taskList });
  } else {
    res.status(404).json({ status: "error", message: "Task not found" });
  }
};

exports.addTask = (req, res) => {
  let task = {
    taskName: req.body.taskName,
    isActive: req.body.isActive,
    isCompleted: req.body.isCompleted,
    id: uuidv4(),
  };
  taskList.push(task);
  res.status(200).json({ status: "success", data: taskList });
};

exports.deleteTask = (req, res) => {
  let id = req.params.id;
  taskList = taskList.filter((t) => t.id !== id);
  res.status(200).json({ status: "success", message: "Task deleted",  data: taskList });
};

exports.deleteAllCheckedTask = (req, res) => {
  taskList = taskList.filter((t) => !t.isCompleted);
  res.status(200).json({ status: "success", message: "Task deleted",  data: taskList });
};
