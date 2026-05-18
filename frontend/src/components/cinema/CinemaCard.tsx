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

type CinemaCardProps = {
  deleteIndex: number;
  data: Cinema;
};

const CinemaCard: React.FC<CinemaCardProps> = ({ deleteIndex, data }): JSX.Element => {
  const { deleteCinema } = useCinemaStore();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Nr.: {data.cinemaIndex}
        </Typography>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {data.address}
        </Typography>
        <Typography variant="body2">Manager: {data.managerName}</Typography>
        <Typography variant="body2">
          Anzahl der Räume: {data.maxCountRooms}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteCinema(deleteIndex)}>
          Löschen
        </Button>
      </CardActions>
    </Card>
  );
};
export default CinemaCard;
