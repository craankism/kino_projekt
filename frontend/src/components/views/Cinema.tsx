import type { JSX } from "@emotion/react/jsx-runtime";
import ViewCinema from "../cinema/ViewCinema";
import { Grid } from "@mui/material";
import NewCinemaButton from "../cinema/NewCinemaButton";

const Cinema = (): JSX.Element => {
  return (
    <>
      <Grid>
        <ViewCinema />
      </Grid>
      <NewCinemaButton />
    </>
  );
};

export default Cinema;
