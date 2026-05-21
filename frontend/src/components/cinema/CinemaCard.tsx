import type { JSX } from "@emotion/react/jsx-runtime";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import type React from "react";
import { useCinemaStore, type Cinema } from "../../stores/useCinemaStore";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';

type CinemaCardProps = {
  index: number;
  data: Cinema;
};

const CinemaCard: React.FC<CinemaCardProps> = ({
  index,
  data,
}): JSX.Element => {
  const { deleteCinema } = useCinemaStore();

  const [expandInfo, setExpandInfo] = useState<boolean>(false);

  function expandedInfo(): void {
    setExpandInfo(!expandInfo);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {expandInfo ? (
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Nr.: {data.cinemaId}
          </Typography>
        ) : null}
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {data.address}
          </Typography>
        {expandInfo ? (
          <Typography variant="body2">Manager: {data.managerName}</Typography>
        ) : null}
        {expandInfo ? (
          <Typography variant="body2">
            Anzahl der Räume: {data.maxCountRooms}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions sx={{justifyContent: "space-between"}}>
        <Button size="small" variant="contained" startIcon={<DeleteIcon />} onClick={() => deleteCinema(index)}>
          Löschen
        </Button>
        <ExpandMore aria-label="show more" onClick={() => expandedInfo()}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};
export default CinemaCard;
