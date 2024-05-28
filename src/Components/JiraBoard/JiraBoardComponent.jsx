import React, { useState } from "react";

import { Box, Grid, TextField, Typography } from "@mui/material";

export default function JiraBoardComponent() {
  const [text, setText] = useState("");
  const [backlog, setBacklog] = useState(["backlog task 1", "backlog task 2"]);
  const [inProgress, setInProgress] = useState([
    "inProgress task 1",
    "inProgress task 2"
  ]);
  const [completed, setCompleted] = useState([
    "completed task 1",
    "completed task 2"
  ]);

  const cardStyle = { background: "#d6d6d6", padding: 16, borderRadius: 12 };

  return (
    <Box mt={2} sx={{ flexGrow: 1 }}>
      <Box mb={2}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Task"
          size="small"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setBacklog([...backlog, text]);
              setText("");
            }
          }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={cardStyle}>
            <Typography variant="h6">Backlog</Typography>
            {backlog.map((item, i) => (
              <div
                style={{
                  cursor: "grabbing",
                  background: "white",
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 8
                }}
                key={i}
                // onClick={() => {
                //   setInProgress([...inProgress, item]);
                //   setBacklog(backlog.filter((item) => item !== item));
                // }}
              >
                {item}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={cardStyle}>
            <Typography variant="h6">In Progress</Typography>
            {inProgress.map((item, i) => (
              <div
                key={i}
                // onClick={() => {
                //   setCompleted([...completed, item]);
                //   setInProgress(inProgress.filter((item) => item !== item));
                // }}
              >
                {item}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={cardStyle}>
            <Typography variant="h6">Completed</Typography>
            {completed.map((item, i) => (
              <div
                key={i}
                // onClick={() => {
                //   setBacklog([...backlog, item]);
                //   setCompleted(completed.filter((item) => item !== item));
                // }}
              >
                {item}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
