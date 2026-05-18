import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MovieIcon from "@mui/icons-material/Movie";
import HouseIcon from "@mui/icons-material/House";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

type TemporaryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function TemporaryDrawer({ open, onClose }: TemporaryDrawerProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleNavigation = (index: number) => {
    if (index === 0) {
      navigate("/cinema");
    } else if (index === 1) {
      navigate("/room");
    } else {
      navigate("/movie");
    }

    handleClose();
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
      <List>
        {["Kino", "Saal", "Film"].map((text, index) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(index)}>
                <ListItemIcon>
                  {index === 0 ? <HouseIcon /> : null}
                  {index === 1 ? <EventSeatIcon /> : null}
                  {index === 2 ? <MovieIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={handleClose}>
      {drawerList}
    </Drawer>
  );
}

export default TemporaryDrawer;
