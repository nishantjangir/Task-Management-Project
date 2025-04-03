import React, { useContext,  useState } from 'react';
import StatusContext from '../Context/StatusContext';
import TaskContext from '../Context/TaskContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Task = () => {
  const { setTasks, tasks } = useContext(TaskContext);
 

 
  const { statuses } = useContext(StatusContext);

  const Assignees = ['Alice', 'Bob', 'Charlie'];
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (title.length > 100) newErrors.title = 'Title must be under 100 characters';
    if (!description) newErrors.description = 'Description is required';
    if (description.length > 300) newErrors.description = 'Description must be under 300 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      status,
      assignee
    };
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const updatedTasks = [...tasks, taskData];
    setTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignee('');
    setStatus('');
    setErrors({});
    navigate('/dashboard');
  };

  return (
    <>
    <Navbar/>
    
 <div className='big'>
    <div className="container">
      <div className="form-box">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Task Title</label>
          <input 
            type="text" 
            placeholder="Enter Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          {errors.title && <p className="error">{errors.title}</p>}

          <label>Task Description</label>
          <textarea 
            placeholder="Enter Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          {errors.description && <p className="error">{errors.description}</p>}

          <label>Status</label>
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            {statuses.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>

          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <label>Assignee</label>
          <select name="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="">Select Assignee</option>
            {Assignees.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default Task