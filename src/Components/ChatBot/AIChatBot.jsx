import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

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

const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
  };
};

export default function AIChatBot() {
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState(null);
  const [result, setResult] = useState("");
  const [useStream, setUseStream] = useState(true);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const runPrompt = async () => {
    // if (!files) return;
    if (!prompt) return;
    setIsLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let params;
    if (files) {
      const imageParts = await Promise.all(
        [...files].map(fileToGenerativePart)
      );
      params = [prompt, ...imageParts];
    } else {
      params = [prompt];
    }

    try {
      if (useStream) {
        const result = await model.generateContentStream(params);
        setIsLoading(false);
        let text = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log(chunkText);
          text += chunkText;
          setResult(text);
        }
      } else {
        const result = await model.generateContent(prompt);
        const resultText = result.response.candidates[0].content.parts[0].text;
        setResult(resultText);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Stack direction="row" mb={2}>
        <Typography variant="h5">AI Chat Bot</Typography>
        <Typography variant="h6">(Powered by Google Generative AI)</Typography>
      </Stack>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={8}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              background: "#f5f5f5"
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={8}
              placeholder="Enter Prompt & Image"
              sx={{ background: "#ffffff" }}
              size="small"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  runPrompt();
                }
              }}
            />
            <TextField
              type="file"
              inputProps={{ ref: fileInputRef }}
              placeholder="Enter Prompt"
              size="small"
              variant="outlined"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              onClick={() => fileInputRef.current.click()}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: "10px" }} onClick={runPrompt}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1">Use Stream</Typography>
            <Switch
              checked={useStream}
              onChange={() => setUseStream(!useStream)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box m={4}>{isLoading ? "Generating..." : formatResponse(result)}</Box>
    </div>
  );
}
