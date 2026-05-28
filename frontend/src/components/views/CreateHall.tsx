import type { JSX } from "@emotion/react/jsx-runtime";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHallStore } from "../../stores/useHallStore";
import SaveAndBackButton from "../nav/SaveAndBackButton";

const CreateHall = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { addHall } = useHallStore();

  const [capacity, setCapacity] = useState<number>(2);
  const [supportedMovieVersion, setSupportedMovieVersion] =
    useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const cinemaId = Number(params.cinemaId);
    const newHall = { capacity, supportedMovieVersion, cinemaId };
    addHall(newHall);
    navigate("/");
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
              label="Anzahl Sitzplätze"
              placeholder="20"
              defaultValue={capacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCapacity(Number(e.target.value))
              }
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <RadioGroup
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSupportedMovieVersion(e.target.value)
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
          <SaveAndBackButton />
        </Grid>
      </form>
    </>
  );
};

export default CreateHall;
