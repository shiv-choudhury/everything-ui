import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

export default function PageNotFound() {
  const textColor = { color: "gray" };

  return (
    <Box item sx={{ textAlign: "center" }}>
      <Typography sx={textColor} variant="h1" component="bold">
        404
      </Typography>
      <Typography sx={textColor} variant="h5">
        Page not found
      </Typography>
      <Typography variant="h6">
        The page you are looking for does not exist!
      </Typography>
      <Typography component={Link} to="/" variant="h6">
        Go Back Home
      </Typography>
    </Box>
  );
}
