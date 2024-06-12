import React from "react";

function AddTodoForm(props) {
  return (
    <form className="todo-form" onSubmit={props.addTodo}>
      <h2 className="todo-subheader">Add new todo</h2>
      <div className="todo-input-container">
        <label className="todo-label" htmlFor="todoName">
          Todo title :
        </label>
        <input
          ref={props.todoInputTitleRef}
          className="todo-input"
          id="todoName"
          type="text"
          required
        />
      </div>
      <button className="todo-button">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
