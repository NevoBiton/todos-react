import { useEffect, useState, useRef } from "react";
import TodoList from "./components/TodoList";
import TodosStatistic from "./components/TodoStatistics";
import AddTodoForm from "./components/TodoForm";
import ProgressBar from "./components/TodoProgressBar";
import TodoFilter from "./components/TodoFilter";

import "./App.css";
import axios from "axios";

const TodosURL = "http://localhost:8001/todos";

function App() {
  const [todosList, setTodosList] = useState([]);
  const [query, setQuery] = useState("");

  const todoInputTitleRef = useRef(null);

  useEffect(() => {
    todoInputTitleRef.current.focus();
    console.log("Hello !");
    axios
      .get(`${TodosURL}`)
      .then(function (response) {
        console.log(response.data);
        setTodosList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function makeId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function calculateProgress() {
    if (todosList.length === 0) return 0;
    const completedTodos = todosList.filter((todo) => todo.isComplete).length;
    return (completedTodos / todosList.length) * 100;
  }

  async function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(6),
      title: todoInputTitleRef.current.value,
      isComplete: false,
    };
    await addTodoToDatabase(newTodo);
    const newTodoList = [...todosList, newTodo];
    setTodosList(newTodoList);
    todoInputTitleRef.current.value = "";
  }

  async function addTodoToDatabase(todo) {
    axios
      .post(TodosURL, todo)
      .then(function (response) {
        console.log("Todo added:", response.data);
      })
      .catch(function (error) {
        console.error("Error adding todo:", error);
      });
  }

  async function removeTodo(todoId) {
    await removeTodoFromDatabase(todoId);
    const newTodoList = todosList.filter((todo) => {
      return todo.id !== todoId ? todo : null;
    });
    setTodosList(newTodoList);
  }

  async function removeTodoFromDatabase(todoId) {
    axios
      .delete(`${TodosURL}/${todoId}`)
      .then(function (response) {
        console.log("Todo removed:", response.data);
      })
      .catch(function (error) {
        console.error("Error adding todo:", error);
      });
  }

  function totalCompletedTodos() {
    const res = todosList.filter((todo) => {
      if (todo.isComplete) {
        return todo;
      }
    });
    return res.length;
  }

  function totalActiveTodos() {
    const res = todosList.filter((todo) => {
      if (!todo.isComplete) {
        return todo;
      }
    });
    return res.length;
  }

  function checkboxChange(todoId) {
    const newTodosList = todosList.map((todo) => {
      if (todo.id === todoId) {
        const updatedTodo = {
          ...todo,
          isComplete: todo.isComplete === false ? true : false,
        };
        updateCheckboxInDatabase(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodosList(newTodosList);
  }

  async function updateCheckboxInDatabase(todo) {
    axios
      .put(`${TodosURL}/${todo.id}`, todo)
      .then((response) => {
        console.log("Todo updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  }

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-header">Todo's List</h1>
        <div>
          <label htmlFor="seacrh">Search Todo : </label>
          <input
            // ref={searchInputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            name="search"
            id="seacrh"
          />
        </div>
        <AddTodoForm todoInputTitleRef={todoInputTitleRef} addTodo={addTodo} />
        <ProgressBar calculateProgress={calculateProgress} />

        <TodoList
          query={query}
          todosList={todosList}
          checkboxChange={checkboxChange}
          removeTodo={removeTodo}
        />
        <TodosStatistic
          totalCompletedTodos={totalCompletedTodos}
          totalActiveTodos={totalActiveTodos}
          todosList={todosList}
        />
      </div>
    </>
  );
}

export default App;
