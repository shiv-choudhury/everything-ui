import { useEffect, useRef, useState } from "react";
import "../../Styles/App.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";

function TodoListComponent() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(null);
  const inputRef = useRef(null);
  const todoInputRef = useRef([]);
  const currentDateTime = moment().format("hh:mm a, DD MMMM YYYY");
  let dummyTodo = {
    completed: false,
    text: "Add your Todo",
    editMode: false,
    dateTime: currentDateTime
  };
  useEffect(() => {
    if (index) {
      todoInputRef.current[index].focus();
    }
  }, [index]);

  useEffect(() => {
    let data = localStorage.getItem("todos");
    if (JSON.parse(data)?.length) {
      setTodos(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue) {
      let todoObj = {
        completed: false,
        text: inputValue,
        editMode: false,
        dateTime: currentDateTime
      };
      let newTodo = [...todos, todoObj];
      addUpdateTodos(newTodo);
      setInputValue("");
      inputRef.current.focus();
    }
  };

  const addUpdateTodos = (newTodo) => {
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const deleteTodo = (index) => {
    let newTodo = [...todos];
    newTodo.splice(index, 1);
    addUpdateTodos(newTodo);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleTodoKeyDown = (e, i) => {
    if (e.key === "Enter") {
      editTodo(i);
    }
  };

  const editTodo = (i) => {
    let newTodo = [...todos];
    newTodo[i] = { ...newTodo[i], ...{ editMode: !todos[i].editMode } };
    addUpdateTodos(newTodo);
    setIndex(i);
    // console.log("todoInputRef", todoInputRef.current[i]);
    // todoInputRef.current[i].focus();
  };

  const handleCheck = (i) => {
    let newTodo = [...todos];
    newTodo[i] = { ...newTodo[i], ...{ completed: !todos[i].completed } };
    addUpdateTodos(newTodo);
  };

  const handleTodoChange = (e, i) => {
    let newTodo = [...todos];
    newTodo[i] = { ...newTodo[i], ...{ text: e.target.value } };
    setTodos(newTodo);
  };

  return (
    <>
      <Box my={2} sx={{ width: "80%" }}>
        <Stack columnGap={2} direction="row" alignItems="top" mb={2}>
          <TextField
            fullWidth
            size="small"
            ref={inputRef}
            value={inputValue}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleAddTodo}>
            Add
          </Button>
        </Stack>
        <Typography variant="h5">List</Typography>
        {todos?.length ? (
          todos?.map((todo, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              columnGap={2}
              style={{
                marginTop: 20,
                background: "#f0f0f0",
                padding: 20,
                borderRadius: 10
              }}
            >
              <Checkbox
                size="large"
                checked={todo.completed}
                onChange={() => handleCheck(index)}
              />
              <TextField
                fullWidth
                size="small"
                ref={(ref) => (todoInputRef.current[index] = ref)}
                disabled={todo.completed}
                InputProps={{
                  readOnly: !todo.editMode
                }}
                className={`${todo.completed && "success"} white`}
                type="text"
                onChange={(e) => handleTodoChange(e, index)}
                onKeyDown={(e) => handleTodoKeyDown(e, index)}
                value={todo.text}
              />
              <Button
                variant="contained"
                disabled={todo.completed}
                color={!todo.editMode ? "secondary" : "success"}
                className={!todo.editMode ? "Edit" : "save-btn"}
                onClick={() => editTodo(index)}
              >
                {!todo.editMode ? <EditIcon /> : <SaveIcon />}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteTodo(index)}
              >
                <DeleteIcon />
              </Button>
              {todo.dateTime && <Typography>{todo.dateTime}</Typography>}
            </Stack>
          ))
        ) : (
          <Typography sx={{ textAlign: "center" }} variant="h5" pt={2}>
            No Todos
          </Typography>
        )}
      </Box>
    </>
  );
}

export default TodoListComponent;
