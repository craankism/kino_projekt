import type { JSX } from "@emotion/react/jsx-runtime";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHallStore } from "../../stores/useHallStore";
import { useMovieStore } from "../../stores/useMovieStore";
import SaveAndBackButton from "../nav/SaveAndBackButton";
import { useCinemaStore } from "../../stores/useCinemaStore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const CreateMovie = (): JSX.Element => {
  const navigate = useNavigate();
  const { cinemaList } = useCinemaStore();
  const { hallList } = useHallStore();
  const { addMovie } = useMovieStore();

  const [title, setTitle] = useState<string>("Catch me if you can");
  const [mainCharacter, setMainCharacter] =
    useState<string>("Leonardo Di Caprio");
  const [description, setDescription] = useState<string>("liesmich");
  const [premieredAt, setPremieredAt] = useState<string>("23.02.1996");
  const [movieVersion, setMovieVersion] = useState<string>("");
  const [halls, setHalls] = useState<string[]>([]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newMovie = {
      title,
      mainCharacter,
      description,
      premieredAt,
      movieVersion,
      halls,
    };
    addMovie(newMovie);
    navigate("/");
  };

  const handleChange = (event: SelectChangeEvent<typeof halls>) => {
    const {
      target: { value },
    } = event;
    setHalls(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: "150%" }}>
        Film erstellen:
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              label="Titel"
              placeholder="Catch me if you can"
              defaultValue={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              label="Hauptcharakter"
              placeholder="Leonardo Di Caprio"
              defaultValue={mainCharacter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMainCharacter(e.target.value)
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              label="Beschreibung"
              placeholder="20"
              defaultValue={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              label="Veröffentlicht am"
              placeholder="23.02.1996"
              defaultValue={premieredAt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPremieredAt(e.target.value)
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <RadioGroup
              aria-required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMovieVersion(e.target.value)
              }
            >
              <FormControlLabel
                control={<Radio />}
                label="D2D (Digital 2D)"
                value="D2D"
              />
              <FormControlLabel
                control={<Radio />}
                label="R3D (Real D 3D)"
                value="R3D"
              />
              <FormControlLabel
                control={<Radio />}
                label="DBOX (D-Box 5D)"
                value="DBOX"
              />
            </RadioGroup>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-name-label">Saal</InputLabel>
              <Select
                required
                multiple
                label="Saal"
                variant="standard"
                value={halls}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {hallList.map((hall, index) =>
                  movieVersion === hall.supportedMovieVersion ? (
                    <MenuItem key={index} value={hall.hallId}>
                      Saal {hall.hallId}(
                      {
                        cinemaList.find(
                          (cinema) => cinema.cinemaId === hall.cinemaId,
                        )?.name
                      }
                      )
                    </MenuItem>
                  ) : null,
                )}
              </Select>
            </FormControl>
          </Grid>
          <SaveAndBackButton />
        </Grid>
      </form>
    </>
  );
};

export default CreateMovie;
