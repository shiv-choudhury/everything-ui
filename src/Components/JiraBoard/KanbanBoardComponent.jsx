import React, { useState } from "react";
import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const KanbanBoard = () => {
  const [task, setTask] = useState("");
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setBacklog([...backlog, task]);
      setTask("");
    }
  };

  const handleDragStart = (e, taskText, column) => {
    e.dataTransfer.setData("text/plain", `${taskText},${column}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, column) => {
    e.preventDefault();
    const [taskText, sourceColumn] = e.dataTransfer
      .getData("text/plain")
      .split(",");

    if (sourceColumn === "backlog") {
      setBacklog(backlog.filter((task) => task !== taskText));
    } else if (sourceColumn === "inProgress") {
      setInProgress(inProgress.filter((task) => task !== taskText));
    } else if (sourceColumn === "completed") {
      setCompleted(completed.filter((task) => task !== taskText));
    }

    if (column === "backlog") {
      setBacklog([...backlog, taskText]);
    } else if (column === "inProgress") {
      setInProgress([...inProgress, taskText]);
    } else if (column === "completed") {
      setCompleted([...completed, taskText]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
        </Grid>
        <Grid item xs={4}>
          <ColumnCard
            title="Backlog"
            column="backlog"
            tasks={backlog}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        </Grid>
        <Grid item xs={4}>
          <ColumnCard
            title="In Progress"
            column="inProgress"
            tasks={inProgress}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        </Grid>
        <Grid item xs={4}>
          <ColumnCard
            title="Completed"
            column="completed"
            tasks={completed}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ColumnCard = (props) => {
  const { title, column, tasks, handleDragStart, handleDrop } = props;
  return (
    <Paper
      sx={{ p: 2, minHeight: 300, background: "#79beff", borderRadius: 2 }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, column)}
    >
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      {tasks.map((task, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, task, column)}
          style={{
            cursor: "move",
            background: "#ffffff",
            padding: 8,
            borderRadius: 8,
            marginBottom: 8
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>{task}</div>
            <DragIndicatorIcon />
          </Stack>
        </div>
      ))}
    </Paper>
  );
};

export default KanbanBoard;
