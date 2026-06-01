import type { JSX } from "@emotion/react/jsx-runtime";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHallStore } from "../../stores/useHallStore";
import SaveAndBackButton from "../nav/SaveAndBackButton";
import { useMovieStore, type Movie } from "../../stores/useMovieStore";

const EditHall = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentHall, editHall, getHallList, hallList } = useHallStore();
  const { updateMovie, movieList } = useMovieStore();

  const [capacity, setCapacity] = useState<number>(0);
  const [supportedMovieVersion, setSupportedMovieVersion] =
    useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);

  const hallFilter = (movie: Movie, hallId: number): boolean => {
    return movie.hallList.some((element) => element === hallId);
  };

  const hasMovies = hallList
    .filter((hall) => hall.cinemaId === currentHall?.cinemaId)
    .some((hall) => movieList.some((movie) => hallFilter(movie, hall.hallId)));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const cinemaId = Number(params.cinemaId);
    const hallId = Number(params.hallId);
    const newHall = { capacity, supportedMovieVersion, cinemaId };
    editHall(newHall, hallId);
    movieList.forEach((movie) => {
      const newHallList = movie.hallList.filter(
        (hallNumber) => hallId != hallNumber,
      );
      updateMovie(movie.movieId, newHallList);
    });
    getHallList();
    navigate("/");
  };

  useEffect(() => {
    // eslint-disable-next-line
    setCapacity(currentHall?.capacity || 0);
    setSupportedMovieVersion(currentHall?.supportedMovieVersion || "");
    setDisable(hasMovies);
    // eslint-disable-next-line
  }, [currentHall]);

  const checkVersion = (value: string): boolean => {
    switch (value) {
      case "D2D":
        if (currentHall?.supportedMovieVersion != "DBOX" || disable) {
          return true;
        }
        return true;
      case "R3D":
        if (currentHall?.supportedMovieVersion != "DBOX" || disable) {
          return true;
        }
        return false;
      case "DBOX":
        if (currentHall?.supportedMovieVersion === "DBOX" ||  !disable) {
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "150%" }}>
        Saal anlegen:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              disabled={disable}
              id="standard-required"
              label="Anzahl Sitzplätze"
              placeholder="20"
              value={capacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCapacity(Number(e.target.value))
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <RadioGroup
              value={supportedMovieVersion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSupportedMovieVersion(e.target.value)
              }
            >
              <FormControlLabel
                control={<Radio />}
                label="D2D (Digital 2D)"
                value="D2D"
                disabled={checkVersion("D2D")}
              />
              <FormControlLabel
                control={<Radio />}
                label="R3D (Real D 3D)"
                value="R3D"
                disabled={checkVersion("R3D")}
              />
              <FormControlLabel
                control={<Radio />}
                label="DBox (D-Box 5D)"
                value="DBOX"
                disabled={checkVersion("DBOX")}
              />
            </RadioGroup>
          </Grid>
          <SaveAndBackButton disable={disable} />
        </Grid>
      </form>
    </>
  );
};

export default EditHall;
