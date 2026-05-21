import type { JSX } from "@emotion/react/jsx-runtime";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import { useCinemaStore } from "../../stores/useCinemaStore";

const ShowCinema = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { getCinema, currentCinema } = useCinemaStore();

  useEffect(() => {
    if (params.cinemaId) {
      getCinema(Number(params.cinemaId));
    }
  }, [params.cinemaId, getCinema]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          disabled
          id="standard-read-only-input"
          helperText="Kino Id"
          defaultValue={currentCinema?.cinemaId}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          disabled
          id="standard-read-only-input"
          helperText="NameKino"
          defaultValue={currentCinema?.name}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          disabled
          id="standard-read-only-input"
          helperText="Adresse"
          defaultValue={currentCinema?.address}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          disabled
          id="standard-read-only-input"
          helperText="Name des Managers"
          defaultValue={currentCinema?.managerName}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          disabled
          id="standard-read-only-input"
          helperText="max. Anzahl an Kinosälen"
          defaultValue={currentCinema?.maxCountRooms}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => navigate("/cinema")}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default ShowCinema;
