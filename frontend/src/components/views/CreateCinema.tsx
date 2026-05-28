import type { JSX } from "@emotion/react/jsx-runtime";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../../stores/useCinemaStore";
import SaveAndBackButton from "../nav/SaveAndBackButton";

const CreateCinema = (): JSX.Element => {
  const navigate = useNavigate();
  const { addCinema } = useCinemaStore();

  const [name, setName] = useState<string>("Cineplexx");
  const [address, setAddress] = useState<string>("Hauptstr.");
  const [managerName, setManagerName] = useState<string>("Hans Bauer");
  const [maxCountRooms, setMaxCountRooms] = useState<number>(55);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newCinema = { name, address, managerName, maxCountRooms };
    addCinema(newCinema);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            label="Name Kino"
            placeholder="Cineplexx"
            defaultValue={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            label="Adresse"
            placeholder="Landstraßer Hauptstraße 1, 1030 Wien"
            defaultValue={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            label="Name des Managers"
            placeholder="Max Mustermann"
            defaultValue={managerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setManagerName(e.target.value)
            }
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            required
            label="max. Anzahl an Kinosälen"
            placeholder="4"
            defaultValue={maxCountRooms}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMaxCountRooms(Number(e.target.value))
            }
            variant="standard"
            fullWidth
          />
        </Grid>
        <SaveAndBackButton />
      </Grid>
    </form>
  );
};

export default CreateCinema;
