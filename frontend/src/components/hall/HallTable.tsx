import {
  IconButton,
  List,
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
import { useMovieStore, type Movie } from "../../stores/useMovieStore";
import { useEffect } from "react";

type HallTableProps = {
  cinemaId: number;
};

const HallTable: React.FC<HallTableProps> = ({ cinemaId }) => {
  const { hallList, getHall, getHallList } = useHallStore();
  const { movieList, getMovieList } = useMovieStore();
  const navigate = useNavigate();

  const hallFilter = (movie: Movie, hallId: number): boolean => {
    return movie.hallList.some((element) => element === hallId);
  };

  useEffect(() => {
    getHallList();
    getMovieList();
  }, [getHallList, getMovieList]);

  let counter = 1;

  return (
    <>
      <TableContainer sx={{ minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Saal</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Sitzplätze</TableCell>
              <TableCell>Filme</TableCell>
              <TableCell>Bearbeiten</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hallList.map((hall, index) =>
              cinemaId == hall.cinemaId ? (
                <TableRow key={index}>
                  <TableCell>{counter++}</TableCell>
                  <TableCell>{hall.supportedMovieVersion}</TableCell>
                  <TableCell>{hall.capacity}</TableCell>
                  <TableCell>
                    {movieList
                      .filter((movie) => hallFilter(movie, hall.hallId))
                      .map((movie, index) => (
                        <List key={index}>
                          <span>{movie.title}</span>
                        </List>
                      ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ flexShrink: 0 }}
                      onClick={() => {
                        getHall(hall.hallId);
                        navigate(
                          "/hall/edit/" + hall.cinemaId + "/" + hall.hallId,
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
