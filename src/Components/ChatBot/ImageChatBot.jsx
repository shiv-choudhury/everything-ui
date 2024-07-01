import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

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

const ImageChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState(null);
  const [result, setResult] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const runPrompt = async () => {
    // if (!files) return;
    if (!prompt) return;

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

    // const params = files ? [prompt, ...imageParts] : prompt;
    // const response = await model.generateContent(params);
    const response = await model.generateContentStream(params);
    let text = "";
    for await (const chunk of response.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
      setResult(text);
    }
    // console.log("response", response);
    // const text = response.response.text();
    // setResult(text);
  };

  return (
    <div>
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
                if (e.key === "Enter") runPrompt();
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
      </Grid>
      <Box my={4} mx={16}>
        {/* {isLoading ? "Generating..." : formatResponse(result)} */}

        {result && <div>{result}</div>}
      </Box>
    </div>
  );
};

export default ImageChatBot;
