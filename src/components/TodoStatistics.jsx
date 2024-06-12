import React from "react";

function TodosStatistic(props) {
  return (
    <>
      <div className="todos-information-wrapper">
        <p>Total todos : {props.todosList.length}</p>
        <p>Completed todos : {props.totalCompletedTodos()}</p>
        <p>Active todos : {props.totalActiveTodos()}</p>
      </div>
    </>
  );
}

export default TodosStatistic;
