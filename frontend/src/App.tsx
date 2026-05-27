import type { JSX } from "@emotion/react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./components/nav/SearchAppBar";
import Cinema from "./components/views/Cinema";
import { Container } from "@mui/material";
import CreateCinema from "./components/views/CreateCinema";
import ShowCinema from "./components/views/ShowCinema";
import CreateHall from "./components/views/CreateHall";
import EditHall from "./components/views/EditHall";
import CreateMovie from "./components/views/CreateMovie";
import ShowMovies from "./components/views/ShowMovies";

const App = (): JSX.Element => {
  return (
    <>
      <SearchAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<Cinema />} />
          <Route path="/cinema/create" element={<CreateCinema />} />
          <Route path="/cinema/show/:cinemaId" element={<ShowCinema />} />
          <Route path="/hall/create/:cinemaId" element={<CreateHall />} />
          <Route path="/hall/edit/:cinemaId/:hallId" element={<EditHall />} />
          <Route path="/movie/create" element={<CreateMovie />} />
          <Route path="/movie/show" element={<ShowMovies />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
