import type { JSX } from "@emotion/react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import SearchAppBar from "./components/nav/SearchAppBar";
import Cinema from "./components/views/Cinema";
import { Container } from "@mui/material";
import CreateCinema from "./components/views/CreateCinema";

const App = (): JSX.Element => {
  return (
    <>
      <SearchAppBar />
      <Container>
        <Routes>
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/cinema/create" element={<CreateCinema />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
