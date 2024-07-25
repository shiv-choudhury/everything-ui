import { Box, LinearProgress, Skeleton } from "@mui/material";
import logo from "../assets/everything-ui-logo.png";

const AppLoader = () => {
  return (
    <div className="yellow_bg">
      <div className="loader_wrapper">
        <img src={logo} width="100%" />
        <LinearProgress color="warning" />
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
