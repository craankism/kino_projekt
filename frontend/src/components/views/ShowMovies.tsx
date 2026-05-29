import type { JSX } from "@emotion/react/jsx-runtime";
import {
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type SelectChangeEvent,
} from "@mui/material";
import { useMovieStore, type Movie } from "../../stores/useMovieStore";
import { useHallStore } from "../../stores/useHallStore";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const ShowMovies = (): JSX.Element => {
  const { movieList, getMovieList, updateMovie } = useMovieStore();
  const { hallList, getHallList } = useHallStore();

  const [movieVersion, setMovieVersion] = useState<string>("");

  const movieFilter = (movie: Movie) => {
    if (movie.movieVersion === movieVersion) return true;
    else if (movieVersion === "") return true;
    return false;
  };
  useEffect(() => {
    getMovieList();
    getHallList();
  }, [getMovieList, getHallList]);

  const handleChange = (movie: Movie, hallIds: number[]) => {
    updateMovie(movie.movieId, hallIds);
  };

  return (
    <>
      Filter:{" "}
      <Select
        value={movieVersion}
        onChange={(e: SelectChangeEvent<string>) =>
          setMovieVersion(e.target.value)
        }
      >
        <MenuItem value={""}>None</MenuItem>
        <MenuItem value={"D2D"}>D2D</MenuItem>
        <MenuItem value={"R3D"}>R3D</MenuItem>
        <MenuItem value={"DBOX"}>DBOX</MenuItem>
      </Select>
      <TableContainer sx={{ minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell>Hauptcharakter</TableCell>
              <TableCell>Beschreibung</TableCell>
              <TableCell>Premiere</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Säle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieList.filter(movieFilter).map((movie, index) => (
              <TableRow key={index}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.mainCharacter}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.premieredAt}</TableCell>
                <TableCell>{movie.movieVersion}</TableCell>
                <TableCell>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      id="standard-multi-select"
                      multiple
                      variant="standard"
                      value={movie.hallList}
                      onChange={(e) =>
                        handleChange(movie, e.target.value as number[])
                      }
                      MenuProps={MenuProps}
                    >
                      {hallList.map((hall) =>
                        movie.movieVersion === hall.supportedMovieVersion ? (
                          <MenuItem key={hall.hallId} value={hall.hallId}>
                            {hall.hallId}
                          </MenuItem>
                        ) : null,
                      )}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowMovies;
