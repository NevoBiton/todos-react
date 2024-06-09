import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const INITIAL_TODOS = [
  { id: '1', title: 'Learn React', isComplete: false },
  { id: '2', title: 'Build a Todo App', isComplete: false },
  { id: '3', title: 'Read JavaScript Documentation', isComplete: true },
  { id: '4', title: 'Write Unit Tests', isComplete: false },
  { id: '5', title: 'Implement Context', isComplete: true } ,
  { id: '6', title: 'Create Portfolio Website', isComplete: false },
  { id: '7', title: 'Learn TypeScript', isComplete: false },
  { id: '8', title: 'Refactor Codebase', isComplete: true },
  { id: '9', title: 'Optimize Performance', isComplete: false },
  { id: '10', title: 'Deploy to Production', isComplete: true }
]


function App() {

  const [todosList, setTodosList] = useState(INITIAL_TODOS);
  const [newTodoName, setNewTodoName] = useState("");

  function makeId(length) { 
    let result = ''; const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    const charactersLength = characters.length;
     for (let i = 0; i < length; i++) { 
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    } 
    return result; 
    }

  function addTodo(ev) {
      ev.preventDefault();
      const newTodo = {
        id : makeId(6),
        title : newTodoName,
        isComplete : false
      }
      const newTodoList = [...todosList, newTodo];
      setTodosList(newTodoList)
      setNewTodoName("")
  
    }  

    function removeTodo(todoId) {
      const newTodoList = todosList.filter((todo) => {
        return todo.id !== todoId ? todo : null
      })
      setTodosList(newTodoList)

    }
    

  function checkboxChange(todoId) {
    const newTodosList = todosList.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, isComplete : todo.isComplete === false ? true : false }
      }
      return todo
    })
    setTodosList(newTodosList)
  }

  return (
    <>
  <div className="todo_container">
    <h1 className="todo_header">Todo's List</h1>
    <form className="todo_form" onSubmit={addTodo}>
      <h2 className="todo_subheader">Add new todo</h2>
      <div className="todo_input_container">
        <label className="todo_label" htmlFor="todoName">Todo title :</label>
        <input className="todo_input" value={newTodoName} onChange={(ev) => {setNewTodoName(ev.target.value)}} id="todoName" type="text"/>
      </div>
      <button className="todo_button">Add Todo</button>
    </form>
    {todosList.length === 0 ? <p className="todo_message">No todos available</p> : null}
    <ul className="todo_list">
      {todosList.map((todo) => {
        return (
          <li className="todo_item" key={todo.id}>
            <div className="todo_title_and_state">
              <p className="todo_title">Title : {todo.title}</p>
              <span className="todo_state">
                State: <input className="todo_checkbox" onChange={() => { checkboxChange(todo.id) }} type="checkbox" checked={todo.isComplete}/>
              </span>
            </div>
            <div className="todo_actions">
              <button className="todo_remove_button" onClick={() => { removeTodo(todo.id)}}>Remove todo</button>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
</>

  )
}

export default App
