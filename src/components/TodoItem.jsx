import { React, useRef, useState } from "react";
import ItemInformation from "./TodoItemInfo";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem(props) {
  const isTodoComplete = props.todo.isComplete ? "checked" : "";

  const [showInfo, setShowInfo] = useState(false);
  const infoButtonRef = useRef(null);

  function handleInfoClick() {
    setShowInfo(!showInfo); // shows the information of the todo
    infoButtonRef.current.textContent = showInfo ? "Info" : "Close info";
  }
  return (
    <>
      <div className="todo-item-and-info-container">
        <li className="todo-item">
          <div className="todo-title-and-state">
            <p className={`todo-title ${isTodoComplete}`}>
              Title : {props.todo.title}
            </p>
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
          <Button
            variant="contained"
            ref={infoButtonRef}
            onClick={handleInfoClick}
            sx={{
              height: "30px",
              minWidth: "fit-content",
              textTransform: "none",
            }}
          >
            Info
          </Button>
          <div className="todo-actions">
            <Button
              sx={{
                width: "30px",
                height: "30px",
                minWidth: 0,
              }}
              onClick={() => {
                props.removeTodo(props.todo.id);
              }}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </div>
        </li>
        <div className={`todo-item-info ${showInfo ? "show" : ""}`}>
          <ItemInformation date={props.todo.date} title={props.todo.title} />
        </div>
      </div>
    </>
  );
}

export default TodoItem;
