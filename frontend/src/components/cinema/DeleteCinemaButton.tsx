import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type React from "react";
import { useCinemaStore } from "../../stores/useCinemaStore";

type DeleteCinemaButtonProps = {
  cinemaId: number;
  disabled: boolean;
};

const DeleteCinemaButton: React.FC<DeleteCinemaButtonProps> = ({
  cinemaId,
  disabled,
}) => {
  const { deleteCinema } = useCinemaStore();

  return (
    <Button
      disabled={disabled}
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
