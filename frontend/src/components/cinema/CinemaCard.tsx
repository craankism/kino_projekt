import type { JSX } from "@emotion/react/jsx-runtime";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import type React from "react";
import { type Cinema } from "../../stores/useCinemaStore";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useHallStore } from "../../stores/useHallStore";
import { useMovieStore, type Movie } from "../../stores/useMovieStore";
import DeleteCinemaButton from "./DeleteCinemaButton";

type CinemaCardProps = {
  data: Cinema;
};

const CinemaCard: React.FC<CinemaCardProps> = ({ data }): JSX.Element => {
  const navigate = useNavigate();

  const { hallList, getHall } = useHallStore();
  const { movieList } = useMovieStore();

  const [expandInfo, setExpandInfo] = useState<boolean>(false);

  function expandedInfo(): void {
    setExpandInfo(!expandInfo);
  }

  const hallFilter = (movie: Movie, hallId: number) => {
    return movie.hallList.some((element) => element === hallId);
  };

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
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
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {hallList.map((hall) =>
            hall.cinema.cinemaId == data.cinemaId ? (
              <>
                <Box
                  key={hall.hallId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "grey.50",
                    border: "1px solid",
                    borderColor: "divider",
                    overflowX: "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "nowrap",
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    Saal {hall.hallId} | Version: {hall.supportedMovieVersion} |{" "}
                    Sitzplätze: {hall.capacity}
                  </Typography>
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ flexShrink: 0 }}
                    onClick={() => {
                      getHall(hall.hallId);
                      navigate(
                        "/hall/edit/" +
                          hall.cinema.cinemaId +
                          "/" +
                          hall.hallId,
                      );
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                {movieList
                  .filter((movie) => hallFilter(movie, hall.hallId))
                  .map((movie, index) => (
                    <List
                      key={index}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        ml: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        {movie.title}
                      </Typography>
                    </List>
                  ))}
              </>
            ) : null,
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <div>
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
            onClick={() => navigate("/hall/create/" + data.cinemaId)}
          >
            Saal hinzufügen
          </Button>
          <DeleteCinemaButton cinemaId={data.cinemaId} />
        </div>

        <ExpandMore aria-label="show more" onClick={() => expandedInfo()}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};
export default CinemaCard;
