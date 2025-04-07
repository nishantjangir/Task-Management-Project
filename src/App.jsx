import React from 'react'
import Routing from './Routing/Routing';
import StatusData from './Context/StatusData';
import TaskData from './Context/TaskData';
import ThemeData from './Context/ThemeData';

const App = () => {
  return (
    <ThemeData>
   <StatusData>
    <TaskData>
    <Routing/>
    </TaskData>
    </StatusData>
    </ThemeData>

  )
}

export default App