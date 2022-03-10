import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch one task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
                 method: 'Post',
                 headers: {
                   'Content-type': 'application/json'
                 },
                 body: JSON.stringify(task)
      }
    )
    const data = await res.json()

    setTasks([...tasks, data])
    //const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = {id, ...task}
    //setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = async (id) => {
    // Removes the task with the id that matches the id argument
    await fetch(`http://localhost:5000/tasks/${id}`,
                 {method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  /*
  // Delete all tasks
  const deleteAll = () => {
    setTasks([])
  }
  */

  // Toggle reminder status
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
    
    // Find the task with matching id and toggle its reminder
    setTasks(tasks.map((task) => task.id === id ? 
      {...task, reminder: data.reminder} :
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
