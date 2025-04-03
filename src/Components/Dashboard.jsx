import React, { useContext } from 'react';
import Navbar from './Navbar';
import StatusContext from "../Context/StatusContext";
import TaskContext from "../Context/TaskContext";

const Dashboard = () => {
  const { statuses } = useContext(StatusContext);
  const { tasks, setTasks } = useContext(TaskContext);

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />
      <div className='hero'>
        <div className="board">
          {statuses.map((status, index) => {
            const filteredTasks = tasks.filter((task) => task.status === status);

            return (
              <div key={status} className="column">
                <h2>{status}</h2>
                <div className='best'>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div className="task" key={task.id}>
                      <h3><strong>{task.title}</strong></h3>
                      <p>{task.description}</p>
                      <p>Due: {task.dueDate}</p>
                      <p>{task.assignee}</p>

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

                      <div className="task-buttons">
                        <button className='qazwsx'
                          onClick={() => updateTaskStatus(task.id, statuses[index + 1])}
                          disabled={index === statuses.length - 1}
                        >
                          {index < statuses.length - 1 ? "Move Forward" : "No More Moves"}
                        </button>
                      </div>
                    </div>
                    
                  ))
                ) : (
                  <p className="no-tasks">No tasks available</p>
                )}
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
