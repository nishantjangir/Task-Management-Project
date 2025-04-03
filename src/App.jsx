import React from 'react'
import Routing from './Routing/Routing';
import StatusData from './Context/StatusData';
import TaskData from './Context/TaskData';

const App = () => {
  return (
   <StatusData>
    <TaskData>
    <Routing/>
    </TaskData>
    </StatusData>

  )
}

export default App