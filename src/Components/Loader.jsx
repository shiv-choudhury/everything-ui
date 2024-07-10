import { Box, LinearProgress, Skeleton } from "@mui/material";

const AppLoader = () => {
  return (
    <div className="yellow_bg">
      <div className="loader_wrapper">
        <img src="../assets/app.svg" />
        <LinearProgress color="success" />
      </div>
    </div>
  );
};

export const LOADER = () => {
  return (
    <Box>
      <Skeleton width="60%" animation="wave" />
      <Skeleton width="80%" animation={false} />
      <Skeleton width="70%" animation="wave" />
      <Skeleton width="90%" animation={false} />
    </Box>
  );
};

export default AppLoader;
