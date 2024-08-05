import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { LOADER } from "../Loader";
import { ConfirmDialog } from "../../Constants/GenericComponents";

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

export default function AIChatBotComponent() {
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState("");
  const [useStream, setUseStream] = useState(true);
  const [abortController, setAbortController] = useState(null);

  const runPrompt = async () => {
    if (!prompt) {
      toast.info("Please enter a prompt");
      return;
    }
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let params;
    if (files?.length > 0) {
      const imageParts = await Promise.all(
        files.map((fileObj) => fileToGenerativePart(fileObj.file))
      );
      params = [prompt, ...imageParts];
    } else {
      params = [prompt];
    }

    try {
      if (useStream) {
        const result = await model.generateContentStream(params, {
          signal: controller.signal
        });
        setIsLoading(false);
        let text = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          text += chunkText;
          setResult(text);
        }
      } else {
        const result = await model.generateContent(prompt, {
          signal: controller.signal
        });
        const resultText = result.response.candidates[0].content.parts[0].text;
        setResult(resultText);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
      console.error(err);
    }
  };

  const handleFileChange = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleManualFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileChange(event.target.files);
    }
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    const imageItems = Array.from(items).filter(
      (item) => item.type.indexOf("image") !== -1
    );

    if (imageItems.length > 0) {
      event.preventDefault();
      const files = imageItems.map((item) => item.getAsFile());
      handleFileChange(files);
    }
  };

  const handleDeleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleNewChat = () => {
    if (abortController) {
      abortController.abort();
    }
    setPrompt("");
    setResult("");
    setFiles([]);
    textInputRef.current.focus();
  };

  return (
    <Box mx="20%">
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Grid item xs={10}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "flex-start",
              background: "#f5f5f5"
            }}
          >
            <Tooltip title="New Chat" arrow placement="top">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                onClick={() => handleNewChat()}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
            <Tooltip title="Upload Image" arrow placement="top">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                onClick={() => fileInputRef.current.click()}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </Tooltip>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  inputRef={textInputRef}
                  value={prompt}
                  fullWidth
                  multiline
                  maxRows={8}
                  placeholder="Enter Prompt & Image"
                  sx={{ background: "#ffffff", my: "2px" }}
                  size="small"
                  onChange={(e) => setPrompt(e.target.value)}
                  onPaste={handlePaste}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      runPrompt();
                    }
                  }}
                />
              </Grid>
              <Grid item>
                {files?.length > 0 && (
                  <Box mt={2}>
                    {files.map((file, index) => (
                      <ImagePreview
                        key={index}
                        file={file}
                        onDelete={() => handleDeleteFile(index)}
                      />
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
            <TextField
              inputProps={{ accept: "image/*", multiple: true }}
              type="file"
              inputRef={fileInputRef}
              placeholder="Enter Prompt"
              size="small"
              variant="outlined"
              style={{ display: "none" }}
              onChange={handleManualFileUpload}
            />
            <IconButton color="primary" sx={{ p: "10px" }} onClick={runPrompt}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Stack direction="row" alignItems="center" mt="4px">
            <Tooltip
              title="When ON response will be streamed"
              arrow
              placement="top"
            >
              <Typography variant="body1">Use Stream</Typography>
            </Tooltip>
            <Switch
              checked={useStream}
              onChange={() => setUseStream(!useStream)}
            />
          </Stack>
        </Grid>
      </Grid>
      {result || isLoading ? (
        <Box m={4}>{isLoading ? <LOADER /> : formatResponse(result)}</Box>
      ) : (
        <QuickPrompts textInputRef={textInputRef} setPrompt={setPrompt} />
      )}
    </Box>
  );
}

const ImagePreview = ({ file, onDelete }) => {
  const [open, setOpen] = useState(false);

  const iconStyles = {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    padding: "2px",
    "&:hover": {
      backgroundColor: "lightgrey"
    }
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block", mb: 1, mr: 1 }}>
      <Tooltip title={file.file.name} arrow>
        <img
          onClick={() => setOpen(true)}
          src={file.preview}
          alt="Preview"
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            objectFit: "cover",
            cursor: "pointer"
          }}
        />
      </Tooltip>
      <IconButton onClick={onDelete} size="small" sx={iconStyles}>
        <CancelOutlinedIcon fontSize="small" />
      </IconButton>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        cancelBtnText="Close"
        bodyText={
          <img
            src={file.preview}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />
        }
      />
    </Box>
  );
};

const QuickPrompts = (props) => {
  const { setPrompt, textInputRef } = props;

  const prompts = [
    {
      label: "Write an essay on Rainy day in 1000 words",
      prompt: "Write an essay on Rainy day in 1000 words"
    },
    {
      label: "What came first, the chicken or the egg?",
      prompt: "What came first, the chicken or the egg?"
    },
    {
      label: "Explain me the Big Bang Theory",
      prompt: "Explain me the Big Bang Theory"
    },
    { label: "Records of Virat Kohli", prompt: "Records of Virat Kohli" }
  ];

  return (
    <Box mx="20%" my={4}>
      <Typography textAlign="center" variant="h5" mb={2}>
        Quick Prompts
      </Typography>
      <Grid container spacing={2}>
        {prompts.map((prompt) => (
          <Grid item xs={6} key={prompt.prompt}>
            <Card
              key={prompt.prompt}
              onClick={() => {
                setPrompt(prompt.prompt);
                textInputRef.current.focus();
              }}
              elevation={1}
              sx={{
                height: "100%",
                background: "#f5f5f5",
                cursor: "pointer",
                "&:hover": { background: "#cde7ff" }
              }}
            >
              <CardContent>{prompt.label}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
