import { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "./api";
import { notify } from "./utils";

interface Task {
  _id: string;
  taskName: string;
  isDone: boolean;
}

function TaskManager() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [copyTasks, setCopyTasks] = useState<Task[]>([]);
  const [updateTasks, setUpdateTasks] = useState<Task | null>(null);
  const handleTask = () => {
    if (updateTasks && input) {
      console.log("update api call");
      const obj = {
        taskName: input,
        isDone: updateTasks.isDone,
        _id: updateTasks._id,
      };
      handleUpdateItem(obj);
    } else if (updateTasks === null && input) {
      console.log("create api call");
      handleAddTask();
    }
    setInput("");
  };
  useEffect(() => {
    if (updateTasks) {
      setInput(updateTasks.taskName);
    }
  }, [updateTasks]);
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }

      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
    // console.log(obj);
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTask();
      console.log(data);
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.log(err);
      notify("Failed to fetch data", "error");
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.log(err);
      notify("Failed to delete data", "error");
    }
  };

  const handleCheckAndUncheck = async (task: Task) => {
    // const { _id, isDone, taskName } = item;
    // const obj = {
    //   taskName,
    //   isDone: !isDone,
    // };
    const updateTasks = {
      taskName: task.taskName,
      isDone: !task.isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(task._id, updateTasks);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };
  const handleUpdateItem = async (task: Task) => {
    try {
      const { success, message } = await UpdateTaskById(task._id, task);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
      setUpdateTasks(null);
    } catch (err) {
      console.error(err);
      notify("Failed to update the task", "error");
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };
  return (
    <div
      className="d-flex flex-column align-items-center
        w-50 m-auto mt-5"
    >
      <h1 className="mb-4">Task Manager App</h1>
      {/* Input and Search box */}
      <div
        className="d-flex justify-content-between
            align-items-center mb-4 w-100"
      >
        <div className="input-group flex-grow-1 me-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control me-1"
            placeholder="Add a new Task"
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search tasks"
          />
        </div>
      </div>

      {/* List of items */}
      <div className="d-flex flex-column w-100">
        {tasks.map((task) => (
          <div key={task._id} className="d-flex flex-column w-100">
            <div
              className="m-2 p-2 border bg-light
                    w-100 rounded-3 d-flex justify-content-between
                    align-items-center"
            >
              <span
                className={task.isDone ? "text-decoration-line-through" : ""}
              >
                {task.taskName}
              </span>

              <div className="">
                <button
                  className="btn btn-success
                                btn-sm me-2"
                  type="button"
                  onClick={() => handleCheckAndUncheck(task)}
                >
                  <FaCheck />
                </button>
                <button
                  className="btn btn-primary
                                btn-sm me-2"
                  type="button"
                  onClick={() => setUpdateTasks(task)}
                >
                  <FaPencilAlt />
                </button>
                <button
                  className="btn btn-danger
                                btn-sm me-2"
                  onClick={() => handleDelete(task._id)}
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
