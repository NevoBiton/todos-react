import { useEffect, useState, useRef } from "react";
import TodoList from "./components/TodoList";
import TodosStatistic from "./components/TodoStatistics";
import AddTodoForm from "./components/TodoForm";
import ProgressBar from "./components/TodoProgressBar";
import AddSearchBar from "./components/TodoSearchbar";
import AddTodoFilter from "./components/TodoFilter";

import axios from "axios";

const TodosURL = "http://localhost:8001/todos";

function App() {
  console.log("Render");
  const [todosList, setTodosList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const todoInputTitleRef = useRef(null);

  useEffect(() => {
    todoInputTitleRef.current.focus();
    async function getTodos() {
      try {
        const res = await axios.get(`${TodosURL}`);
        setTodosList(res.data);
      } catch (err) {
        console.log("Error", err);
      }
    }
    getTodos();
  }, []);

  function calculateProgress() {
    if (todosList.length === 0) return 0;
    const completedTodos = todosList.filter((todo) => todo.isComplete).length;
    return (completedTodos / todosList.length) * 100;
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
        <div className="searchbar-and-filter-wrapper">
          <AddSearchBar query={query} setQuery={setQuery} />
          <AddTodoFilter filter={filter} setFilter={setFilter} />
        </div>
        <AddTodoForm
          todoInputTitleRef={todoInputTitleRef}
          todosList={todosList}
          setTodosList={setTodosList}
        />
        <ProgressBar calculateProgress={calculateProgress} />
        <TodoList
          setFilter={setFilter}
          filter={filter}
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
