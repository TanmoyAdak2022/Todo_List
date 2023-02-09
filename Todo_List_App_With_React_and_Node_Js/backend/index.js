const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json());

const taskController = require("./controllers/task");

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the API" });
});

app.get("/getTodoService", taskController.getTasks);
app.post("/addTodoService", taskController.addTask);
app.put("/:id/updateTodoService", taskController.updateTask);
app.delete("/:id/deleteTodoService", taskController.deleteTask);
app.delete("/deleteAllCheckedTodoService", taskController.deleteAllCheckedTask);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "404 Not Found" });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});
