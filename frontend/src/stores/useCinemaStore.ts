import { create } from "zustand";

export type Cinema = {
  cinemaId: number;
  name: string;
  address: string;
  managerName: string;
  maxCountRooms: number;
};

export type NewCinema = {
  name: string;
  address: string;
  managerName: string;
  maxCountRooms: number;
};

type CinemaState = {
  cinemaList: Cinema[];
  currentCinema: Cinema | null;
  addCinema: (cinema: NewCinema) => void;
  getCinema: (index: number) => void;
  getCinemaList: () => void;
  deleteCinema: (index: number) => void;
};

const url = "http://localhost:8080/api/cinema";

export const useCinemaStore = create<CinemaState>((set) => ({
  cinemaList: [],
  currentCinema: null,
  addCinema: (cinema: NewCinema) => {
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(cinema),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        set((state) => ({ cinemaList: [...state.cinemaList, result] }));
      });
  },

  getCinemaList: () => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ cinemaList: result }));
      });
  },

  getCinema: (index) => {
    fetch(url + "/" + index)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ currentCinema: result }));
      });
  },

  deleteCinema: (index) => {
    fetch(url + "/" + index, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        set((state) => ({
          cinemaList: state.cinemaList.filter(
            (cinema) => cinema.cinemaId !== index,
          ),
        }));
        return res.text();
      })
      .then((text) => {
        console.log(text);
      });
  },
}));
