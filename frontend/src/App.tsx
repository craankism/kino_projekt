import type { JSX } from "@emotion/react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./components/nav/SearchAppBar";
import Cinema from "./components/views/Cinema";
import { Container } from "@mui/material";
import CreateCinema from "./components/views/CreateCinema";
import ShowCinema from "./components/views/ShowCinema";
import CreateHall from "./components/views/CreateHall";

const App = (): JSX.Element => {
  return (
    <>
      <SearchAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<Cinema />} />
          <Route path="/cinema/create" element={<CreateCinema />} />
          <Route path="/cinema/show/:cinemaId" element={<ShowCinema />} />
          <Route path="/hall/create" element={<CreateHall />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
