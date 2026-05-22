import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useHallStore } from "../../stores/useHallStore";
import type React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

type HallTableProps = {
  cinemaId: number;
};

const HallTable: React.FC<HallTableProps> = ({ cinemaId }) => {
  const { hallList, getHall } = useHallStore();
  const navigate = useNavigate();

  return (
    <>
      <TableContainer sx={{ minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Saal</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Sitzplätze</TableCell>
              <TableCell>Bearbeiten</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {hallList.map((hall, index) =>
              cinemaId == hall.cinema.cinemaId ? (
                <TableRow key={index}>
                  <TableCell>{hall.hallId}</TableCell>
                  <TableCell>{hall.supportedMovieVersion}</TableCell>
                  <TableCell>{hall.capacity}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ flexShrink: 0 }}
                      onClick={() => {
                        getHall(hall.hallId);
                        navigate(
                          "/hall/edit/" +
                            hall.cinema.cinemaId +
                            "/" +
                            hall.hallId,
                        );
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : null,
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HallTable;
