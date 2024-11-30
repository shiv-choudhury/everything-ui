import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Box, Button, Typography } from "@mui/material";

export default function WebcamComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);
  const videoConstraints = {
    width: 400,
    height: 230,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage((prev) => [...prev, imageSrc]);
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Typography variant="h5">Webcam</Typography>
      <div className="w-12">
        <Webcam
          className="w-12"
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <Box my={2}>
        <Button variant="contained" onClick={capture}>
          Capture photo
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          onClick={() => setCapturedImage([])}
        >
          Delete All
        </Button>
      </Box>
      <Box my={2}>
        {capturedImage.map((image, index) => (
          <img
            src={image}
            key={index}
            alt="Captured"
            className="object-cover w-[400px]"
          />
        ))}
      </Box>
    </div>
  );
}
