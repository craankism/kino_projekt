import type { JSX } from "@emotion/react/jsx-runtime";
import CinemaCard from "./CinemaCard";
import { useCinemaStore } from "../../stores/useCinemaStore";

const ViewCinema = (): JSX.Element => {
  const { cinemaList } = useCinemaStore();

  return (
    <>
      {cinemaList.map((cinema, index) => (
        <CinemaCard key={index} data={cinema} deleteIndex={index} />
      ))}
      
    </>
  );
};

export default ViewCinema;
