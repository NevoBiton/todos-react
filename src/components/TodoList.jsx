import { React, useMemo, useState, useRef } from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  let searchedTodos = useMemo(() => {
    return props.todosList.filter((todo) =>
      todo.title.toLowerCase().includes(props.query.toLowerCase())
    );
  }, [props.query, props.todosList]);

  const completedTodos = useMemo(() => {
    return searchedTodos.filter((todo) => (todo.isComplete ? todo : null));
  }, [props.query, props.todosList]);

  const unCompletedTodos = useMemo(() => {
    return searchedTodos.filter((todo) => (!todo.isComplete ? todo : null));
  }, [props.query, props.todosList]);

  const sortedTodosList = searchedTodos.toSorted((a, b) => {
    const nameA = a.title;
    const nameB = b.title;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  if (props.filter.toLowerCase() === "completed") {
    searchedTodos = completedTodos;
  }

  if (props.filter.toLowerCase() === "not completed") {
    searchedTodos = unCompletedTodos;
  }

  if (props.filter.toLowerCase() === "alphabet") {
    searchedTodos = sortedTodosList;
  }

  return (
    <>
      {searchedTodos.length === 0 ? (
        <p className="todo-message">No todos available</p>
      ) : null}
      <ul className="todo-list">
        {searchedTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              checkboxChange={props.checkboxChange}
              removeTodo={props.removeTodo}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
