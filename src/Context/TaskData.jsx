import React, { useState , useEffect } from 'react'
import  TaskContext from './TaskContext'

const NewData = (props) => {
    const [tasks, setTasks] = useState(() => {
      try {
        const savedTask = localStorage.getItem('tasks');
        return savedTask ? JSON.parse(savedTask) : [];
      } catch  {
        return [];
      }
    });



     useEffect(() => {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }, [tasks]);
     
  return (
    <TaskContext.Provider value={{  tasks , setTasks  }}>
        {props.children}
    </TaskContext.Provider>
  )
}

export default NewData