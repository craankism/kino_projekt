import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import type { JSX } from "@emotion/react/jsx-runtime";
import { useNavigate } from "react-router-dom";


const NewCinemaButton = (): JSX.Element => {
    const navigate = useNavigate();
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => navigate("/cinema/create")}
      >
      </SpeedDial>
    </Box>
  );
};

export default NewCinemaButton;
