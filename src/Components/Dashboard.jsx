import React, { useContext } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Navbar from "./Navbar";
import StatusContext from "../Context/StatusContext";
import TaskContext from "../Context/TaskContext";

const Dashboard = () => {
  const { statuses } = useContext(StatusContext);
  const { tasks, setTasks } = useContext(TaskContext);

  const handleDrop = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id.toString() === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="board">
          {statuses.map((status) => {
            const filteredTasks = tasks.filter((task) => task.status === status);

            return (
              <Droppable key={status} types={["task"]} onDrop={(data) => handleDrop(data.task, status)}>
                <div className="column">
                  <h2>{status}</h2>
                  <div className="best">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <Draggable key={task.id} type="task" data={task.id.toString()}>
                          <div className="task">
                            <h3 className="extra"><strong>{task.title}</strong></h3>
                            <p className="task-description">{task.description}</p>
                            <p>Due: {task.dueDate}</p>
                            <p>{task.assignee}</p>
                      
                          <div id='new'>
                          <select className='abcd'
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          </div>
                          </div>
                        </Draggable>
                      ))
                    ) : (
                      <p className="no-tasks">No tasks available</p>
                    )}
                  </div>
                </div>
              </Droppable>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
