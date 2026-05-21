import type { JSX } from "@emotion/react/jsx-runtime";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../../stores/useCinemaStore";

const CreateHall = (): JSX.Element => {
  const navigate = useNavigate();
  const { addCinema } = useCinemaStore();

  const [capacity, setCapacity] = useState<number>();
  const [supportedMovieVersion, setSupportertedMovieVersion] =
    useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [maxCountRooms, setMaxCountRooms] = useState<number>(0);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newCinema = { name, address, managerName, maxCountRooms };
    addCinema(newCinema);
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
              id="standard-required"
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
            <FormGroup
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSupportertedMovieVersion(e.target.value)
              }
            >
              <FormControlLabel control={<Checkbox />} label="D2D" />
              <FormControlLabel control={<Checkbox />} label="R3D" />
              <FormControlLabel control={<Checkbox />} label="DBOX" />
            </FormGroup>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              Speichern
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateHall;
