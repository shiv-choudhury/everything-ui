import React from "react";

import { Typography } from "@mui/material";

import TodoListComponent from "./TodoListComponent";

export default function TodoList() {
  return (
    <div>
      <Typography variant="h5">TodoList</Typography>
      <TodoListComponent />
    </div>
  );
}
