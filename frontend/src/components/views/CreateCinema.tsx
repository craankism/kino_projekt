import type { JSX } from "@emotion/react/jsx-runtime";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useCinemaStore } from "../../stores/useCinemaStore";

const CreateCinema = (): JSX.Element => {
  const navigate = useNavigate();
  const { addCinema } = useCinemaStore();

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [managerName, setManagerName] = useState<string>("");
  const [maxCountRooms, setMaxCountRooms] = useState<number>(0);



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
            id="standard-required"
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
            id="standard-required"
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
            id="standard-required"
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
            id="standard-required"
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Speichern
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCinema;
