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

function TodoListComponent() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(null);
  const inputRef = useRef(null);
  const todoInputRef = useRef([]);

  useEffect(() => {
    if (index) {
      todoInputRef.current[index].focus();
    }
  }, [index]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue) {
      let todoObj = { completed: false, text: inputValue, editMode: false };
      setTodos([...todos, todoObj]);
      setInputValue("");
      inputRef.current.focus();
    }
  };

  const deleteTodo = (index) => {
    let newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
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
    setTodos(newTodo);
    setIndex(i);
    // console.log("todoInputRef", todoInputRef.current[i]);
    // todoInputRef.current[i].focus();
  };

  const handleCheck = (i) => {
    let newTodo = [...todos];
    newTodo[i] = { ...newTodo[i], ...{ completed: !todos[i].completed } };
    setTodos(newTodo);
  };

  const handleTodoChange = (e, i) => {
    let newTodo = [...todos];
    newTodo[i] = { ...newTodo[i], ...{ text: e.target.value } };
    setTodos(newTodo);
  };

  return (
    <>
      <Box my={2}>
        <Stack columnGap={2} direction="row" alignItems="center" mb={2}>
          <TextField
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
        {todos?.map((todo, index) => (
          <Stack key={index} direction="row" alignItems="center" columnGap={2}>
            <Checkbox
              size="large"
              checked={todo.completed}
              onChange={() => handleCheck(index)}
            />
            <TextField
              size="small"
              ref={(ref) => (todoInputRef.current[index] = ref)}
              disabled={todo.completed}
              InputProps={{
                readOnly: !todo.editMode
              }}
              className={`${todo.completed && "success"}`}
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
          </Stack>
        ))}
      </Box>
    </>
  );
}

export default TodoListComponent;
