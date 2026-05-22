import type { JSX } from "@emotion/react/jsx-runtime";
import CinemaCard from "./CinemaCard";
import { useCinemaStore } from "../../stores/useCinemaStore";
import { useEffect } from "react";
import { useHallStore } from "../../stores/useHallStore";

const ViewCinema = (): JSX.Element => {
  const { getCinemaList, cinemaList } = useCinemaStore();
  const { getHallList } = useHallStore();

  useEffect(() => {
    getCinemaList();
    getHallList();
  }, [getCinemaList, getHallList]);

  return (
    <>
      {cinemaList.map((cinema, index) => (
        <CinemaCard key={index} data={cinema} />
      ))}
    </>
  );
};

export default ViewCinema;
