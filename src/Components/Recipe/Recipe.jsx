import React from "react";

import { Typography } from "@mui/material";
import RecipeComponent from "./RecipeComponent";

export default function RecipeApp() {
  return (
    <div>
      <Typography variant="h5">Food Recipe App</Typography>
      <RecipeComponent />
    </div>
  );
}
