import React from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const TodosURL = "http://localhost:8001/todos";

function AddTodoForm(props) {
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

  async function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(6),
      title: props.todoInputTitleRef.current.value,
      isComplete: false,
      date: new Date().toString(),
    };
    await addTodoToDatabase(newTodo);
    const newTodoList = [...props.todosList, newTodo];
    console.log(newTodoList);
    props.setTodosList(newTodoList);
    props.todoInputTitleRef.current.value = "";
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

  return (
    <Box
      className="todo-form"
      component="form"
      onSubmit={addTodo}
      autoComplete="off"
    >
      <Typography alignSelf="center" variant="h5">
        Add todo
      </Typography>

      <Box display="flex" gap="1rem">
        <TextField
          sx={{
            flex: "1",
          }}
          inputRef={props.todoInputTitleRef}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          required
          InputProps={{
            sx: {
              height: "40px",
            },
          }}
          InputLabelProps={{
            sx: {
              lineHeight: "15px",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Add todo
        </Button>
      </Box>
    </Box>
  );
}

export default AddTodoForm;
