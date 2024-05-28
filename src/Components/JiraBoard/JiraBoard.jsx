import React from "react";

import { Typography } from "@mui/material";
// import JiraBoardComponent from "./JiraBoardComponent";
import KanbanBoardComponent from "./KanbanBoardComponent";

export default function JiraBoard() {
  return (
    <div>
      <Typography variant="h5">Jira Board</Typography>
      {/* <JiraBoardComponent /> */}
      <KanbanBoardComponent />
    </div>
  );
}
