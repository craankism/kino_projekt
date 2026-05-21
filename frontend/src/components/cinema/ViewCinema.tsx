import type { JSX } from "@emotion/react/jsx-runtime";
import CinemaCard from "./CinemaCard";
import { useCinemaStore } from "../../stores/useCinemaStore";
import { useEffect } from "react";

const ViewCinema = (): JSX.Element => {
  const { getCinemaList, cinemaList } = useCinemaStore();

  useEffect(() => {
    getCinemaList();
  }, [getCinemaList]);

  return (
    <>
      {cinemaList.map((cinema, index) => (
        <CinemaCard key={index} data={cinema} index={index} />
      ))}
    </>
  );
};

export default ViewCinema;
