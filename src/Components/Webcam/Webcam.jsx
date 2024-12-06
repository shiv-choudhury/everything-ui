import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Box, Button, IconButton, Typography } from "@mui/material";

export default function WebcamComponent() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerIntervalRef = useRef(null);
  const videoConstraints = {
    width: 400,
    height: 230,
    facingMode: "user"
  };

  useEffect(() => {
    const imageSrc = localStorage.getItem("imageSrc");
    if (imageSrc) {
      try {
        const parsedImages = JSON.parse(imageSrc);
        if (Array.isArray(parsedImages)) {
          setCapturedImage(parsedImages);
        }
      } catch (error) {
        console.error("Error parsing images from localStorage:", error);
        localStorage.removeItem("imageSrc"); // Clear invalid data
      }
    }
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage((prev) => {
      const newImages = [...prev, imageSrc];
      localStorage.setItem("imageSrc", JSON.stringify(newImages));
      return newImages;
    });
  }, [webcamRef]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    setRecordingDuration(0);
    const stream = webcamRef.current.stream;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();

    // Start the timer
    timerIntervalRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);
  }, [webcamRef, setIsRecording]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => [...prev, data]);
      }
    },
    [setRecordedChunks]
  );

  const handleStopRecording = useCallback(() => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    // Clear the timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, [mediaRecorderRef, setIsRecording]);

  const handleSaveVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      setRecordedVideos((prev) => [...prev, url]);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div>
      <Typography variant="h5">Webcam</Typography>
      <div className="w-12" style={{ position: "relative" }}>
        {isCameraOn ? (
          <Webcam
            className="w-12"
            ref={webcamRef}
            audio={true}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <Box
            sx={{
              width: videoConstraints.width,
              height: videoConstraints.height,
              bgcolor: "black"
            }}
          />
        )}
        {isRecording && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              zIndex: 1000
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "red",
                borderRadius: "50%",
                animation: "pulse 1s infinite"
              }}
            />
            {formatTime(recordingDuration)}
          </Box>
        )}
      </div>
      <Box my={2}>
        <Button
          variant="contained"
          color={isCameraOn ? "error" : "success"}
          onClick={() => setIsCameraOn(!isCameraOn)}
          sx={{ mr: 2 }}
        >
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </Button>
        <Button variant="contained" onClick={capture} disabled={!isCameraOn}>
          Capture photo
        </Button>
        {isCameraOn && (
          <>
            <Button
              sx={{ ml: 2 }}
              variant="contained"
              color={isRecording ? "error" : "primary"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            {recordedChunks.length > 0 && (
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                color="success"
                onClick={handleSaveVideo}
              >
                Save Video
              </Button>
            )}
          </>
        )}
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          onClick={() => {
            setCapturedImage([]);
            setRecordedVideos([]);
            localStorage.removeItem("imageSrc");
          }}
        >
          Delete All
        </Button>
      </Box>
      <Box my={2} display="flex" flexWrap="wrap">
        {capturedImage.map((image, index) => (
          <Box key={index} sx={{ position: "relative", width: "400px", mr: 2 }}>
            <img
              src={image}
              key={index}
              alt="Captured"
              className="object-cover w-[400px]"
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => {
                const updatedImages = capturedImage.filter(
                  (_, i) => i !== index
                );
                setCapturedImage(updatedImages);
              }}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
      <Box my={2} display="flex" flexWrap="wrap">
        {recordedVideos.map((videoUrl, index) => (
          <Box
            key={index}
            sx={{ position: "relative", width: "400px", mr: 2, mb: 2 }}
          >
            <video width="400" controls>
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <Button
              variant="contained"
              color="secondary"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => {
                const updatedVideos = recordedVideos.filter(
                  (_, i) => i !== index
                );
                setRecordedVideos(updatedVideos);
                URL.revokeObjectURL(videoUrl); // Clean up the URL
              }}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
}
