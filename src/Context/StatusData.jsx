import React, { useState ,useEffect } from 'react'

import StatusContext from './StatusContext'

const TaskData = (props) => {

  const defaultStatuses = ['To-Do', 'In Progress', 'Done', 'Blocked'];
    const [statuses, setStatuses] = useState(() => {
      try {
        const savedStatuses = localStorage.getItem('task-statuses');
        return savedStatuses ? JSON.parse(savedStatuses) : defaultStatuses ;
      } catch {
        return defaultStatuses;
      }
    });
    
    useEffect(() => {
      localStorage.setItem('task-statuses', JSON.stringify(statuses));
    }, [statuses]);
 
  return (
    <StatusContext.Provider value={{ statuses, setStatuses , defaultStatuses }}>
        {props.children}
    </StatusContext.Provider>
  )
}

export default TaskData