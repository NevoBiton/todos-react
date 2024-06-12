import React from "react";
import TodoItem from "./TodoItem";

function TodoFilter(props) {
  const filteredTodos = props.todosList.filter((todo) =>
    todo.title.toLowerCase().includes(props.query.toLowerCase())
  );

  return (
    <>
      {filteredTodos.length === 0 ? (
        <p className="todo-message">No todos available</p>
      ) : null}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkboxChange={props.checkboxChange}
            removeTodo={props.removeTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoFilter;
