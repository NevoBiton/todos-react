import React from "react";

function TodoItem(props) {
  return (
    <li className="todo-item">
      <div className="todo-title-and-state">
        <p className="todo-title">Title : {props.todo.title}</p>
        <span className="todo-state">
          State:{" "}
          <input
            className="todo-checkbox"
            onChange={() => {
              props.checkboxChange(props.todo.id);
            }}
            type="checkbox"
            checked={props.todo.isComplete}
          />
        </span>
      </div>
      <div className="todo-actions">
        <button
          className="todo-remove-button"
          onClick={() => {
            props.removeTodo(props.todo.id);
          }}
        >
          Remove todo
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
