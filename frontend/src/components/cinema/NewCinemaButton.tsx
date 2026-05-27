import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import type { JSX } from "@emotion/react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MovieIcon from "@mui/icons-material/Movie";
import { Backdrop, SpeedDialAction } from "@mui/material";
import { useHallStore } from "../../stores/useHallStore";
import React from "react";

const NewCinemaButton = (): JSX.Element => {
  const { hallList } = useHallStore();
  const navigate = useNavigate();

  const actions = [
    { icon: <HouseIcon />, name: "Kino" },
    ...(hallList.length > 0 ? [{ icon: <MovieIcon />, name: "Film" }] : []),
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            onClick={() => {
              if (action.name === "Kino") {
                navigate("/cinema/create");
              } else if (action.name === "Film") {
                navigate("/movie/create");
              }
            }}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default NewCinemaButton;
