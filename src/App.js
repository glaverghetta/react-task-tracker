import {useState} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: "Doctors appt",
        day: 'Feb 5th at 2:30 pm',
        reminder: true,
    },

    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30 pm',
        reminder: false,
    },
    ])

  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = (id) => {
    // Removes the task with the id that matches the id argument
    setTasks(tasks.filter((task) => task.id !== id))
  }

  /*
  // Delete all tasks
  const deleteAll = () => {
    setTasks([])
  }
  */

  // Toggle reminder status
  const toggleReminder = (id) => {
    // Find the task with matching id and toggle its reminder
    setTasks(tasks.map((task) => task.id === id ? 
      {...task, reminder: !task.reminder} :
      task))
  }

  return (
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
                onDeleteAll ={() => setTasks([])}
                showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />} 
        {tasks.length > 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask}
                               onToggle={toggleReminder} /> :
          ('No Tasks to show') }
    </div>
  );
}

export default App;
