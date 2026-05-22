import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MovieIcon from "@mui/icons-material/Movie";
import HouseIcon from "@mui/icons-material/House";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../../stores/useCinemaStore";

type TemporaryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function TemporaryDrawer({ open, onClose }: TemporaryDrawerProps) {
  const navigate = useNavigate();

  const { cinemaList } = useCinemaStore();

  const handleClose = () => {
    onClose();
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleClose}>
      <List>
        <>
          <ListItem onClick={() => navigate("/")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HouseIcon />
              </ListItemIcon>
              <ListItemText primary="Kino" />
            </ListItemButton>
          </ListItem>
          {cinemaList.map((cinema, index) => (
            <ListItem
              onClick={() => navigate("/cinema/show/" + cinema.cinemaId)}
              key={index}
              sx={{ ml: 2 }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary={cinema.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </>
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
