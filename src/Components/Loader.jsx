import { LinearProgress } from "@mui/material";

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

export default AppLoader;
