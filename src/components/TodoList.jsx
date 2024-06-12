import React from "react";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

function TodoList(props) {
  if (props.query !== "") {
    return (
      <TodoFilter
        todosList={props.todosList}
        checkboxChange={props.checkboxChange}
        removeTodo={props.removeTodo}
        query={props.query}
      />
    );
  }

  return (
    <>
      {props.todosList.length === 0 ? (
        <p className="todo-message">No todos available</p>
      ) : null}
      <ul className="todo-list">
        {props.todosList.map((todo) => {
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
