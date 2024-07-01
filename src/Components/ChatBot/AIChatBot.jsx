import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import ImageChatBot from "./ImageChatBot";
import SendIcon from "@mui/icons-material/Send";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const formatResponse = (response) => {
  const lines = response.split("\n");

  // Regex patterns for different formatting
  const boldPattern = /\*\*(.*?)\*\*/g;
  const italicPattern = /\*(.*?)\*/g;
  const codePattern = /`([^`]+)`/g;
  const blockCodePattern = /```([^`]+)```/g;
  const bulletPattern = /^\*\s(.*)/;
  const headerPattern = /^##\s(.*)/;

  // Array to store the formatted content
  let formattedContent = [];
  let currentList = null;

  lines.forEach((line, index) => {
    // Handle block code
    const blockCodeMatch = line.match(blockCodePattern);
    if (blockCodeMatch) {
      formattedContent.push(
        <Box
          component="pre"
          key={index}
          sx={{ bgcolor: "grey.200", p: 1, borderRadius: 1 }}
        >
          <code>{blockCodeMatch[1]}</code>
        </Box>
      );
      return;
    }

    // Handle headers
    const headerMatch = line.match(headerPattern);
    if (headerMatch) {
      formattedContent.push(
        <Typography key={index} variant="h2" sx={{ mt: 2, mb: 1 }}>
          {headerMatch[1]}
        </Typography>
      );
      return;
    }

    // Handle bullet points
    const bulletMatch = line.match(bulletPattern);
    if (bulletMatch) {
      if (!currentList) {
        currentList = [];
      }
      currentList.push(
        <ListItem key={index}>
          <ListItemText primary={bulletMatch[1]} />
        </ListItem>
      );
      return;
    } else {
      if (currentList) {
        formattedContent.push(
          <List key={`list-${index}`} dense>
            {currentList}
          </List>
        );
        currentList = null;
      }
    }

    // Handle inline code
    let formattedLine = line.replace(
      codePattern,
      (match, p1) => `<code>${p1}</code>`
    );

    // Handle bold text
    formattedLine = formattedLine.replace(
      boldPattern,
      (match, p1) => `<strong>${p1}</strong>`
    );

    // Handle italic text
    formattedLine = formattedLine.replace(
      italicPattern,
      (match, p1) => `<em>${p1}</em>`
    );

    formattedContent.push(
      <Typography
        key={index}
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      />
    );
  });

  // Add any remaining list items
  if (currentList) {
    formattedContent.push(
      <List key={`list-final`} dense>
        {currentList}
      </List>
    );
  }

  return formattedContent;
};

export default function AIChatBot() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getPromptResponse() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const responseText = result.response.candidates[0].content.parts[0].text;
      setResponse(responseText);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Stack direction="row">
        <Typography variant="h5">AI Chat Bot</Typography>
        <Typography variant="h6">(Powered by Google Generative AI)</Typography>
      </Stack>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
        mt={1}
      >
        <Grid item md={10}>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Prompt"
            size="small"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getPromptResponse();
              }
            }}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Grid>
        <Grid item md={2}>
          <Button variant="contained" onClick={getPromptResponse}>
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
      <Box m={4}>{isLoading ? "Generating..." : formatResponse(response)}</Box>
      <Box mt={2}>
        <ImageChatBot />
      </Box>
    </div>
  );
}
