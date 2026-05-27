import type { JSX } from "@emotion/react/jsx-runtime";
import { Button, Grid } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

const SaveAndBackButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Button
        type="submit"
        variant="contained"
        startIcon={<SaveIcon />}
        sx={{ mr: 2 }}
      >
        Speichern
      </Button>
      <Button
        type="submit"
        variant="contained"
        startIcon={<NavigateBeforeIcon />}
        sx={{ mr: 2 }}
        onClick={() => navigate(-1)}
      >
        Zurück
      </Button>
    </Grid>
  );
};

export default SaveAndBackButton;
