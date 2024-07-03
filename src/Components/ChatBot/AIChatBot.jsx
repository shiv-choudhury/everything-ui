import React from "react";

import { Stack, Typography } from "@mui/material";

import AIChatBotComponent from "./AIChatBotComponent";

export default function AIChatBot() {
  return (
    <div>
      <Stack direction="row" mb={2}>
        <Typography variant="h5">AI Chat Bot</Typography>
        <Typography variant="h6">(Powered by Google Generative AI)</Typography>
      </Stack>
      <AIChatBotComponent />
    </div>
  );
}
