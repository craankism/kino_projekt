import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type React from "react";
import { useCinemaStore } from "../../stores/useCinemaStore";

type DeleteCinemaButtonProps = {
  cinemaId: number;
};

const DeleteCinemaButton: React.FC<DeleteCinemaButtonProps> = ({
  cinemaId,
}) => {
  const { deleteCinema } = useCinemaStore();

  return (
    <Button
      startIcon={<DeleteIcon />}
      size="small"
      variant="contained"
      sx={{ mr: 2 }}
      onClick={() => {
        deleteCinema(cinemaId);
      }}
    >
      Löschen
    </Button>
  );
};

export default DeleteCinemaButton;
