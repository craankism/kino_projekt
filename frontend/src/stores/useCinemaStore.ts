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
  addCinema: (cinema: NewCinema) => Promise<void>;
  getCinema: (index: number) => Promise<void>;
  getCinemaList: () => Promise<void>;
  deleteCinema: (index: number) => Promise<void>;
};

const url = "http://localhost:8080/api/cinema";

export const useCinemaStore = create<CinemaState>((set) => ({
  cinemaList: [],
  currentCinema: null,
  addCinema: async (cinema: NewCinema) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(cinema),
    });

    const result = await res.json();
    console.log(result);
    set((state) => ({ cinemaList: [...state.cinemaList, result] }));
  },

  getCinemaList: async () => {
    const res = await fetch(url);
    const result = await res.json();
    set(() => ({ cinemaList: result }));
  },

  getCinema: async (index) => {
    const res = await fetch(url + "/" + index);
    const result = await res.json();
    set(() => ({ currentCinema: result }));
  },

  deleteCinema: async (index) => {
    const res = await fetch(url + "/" + index, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    set((state) => ({
      cinemaList: state.cinemaList.filter(
        (cinema) => cinema.cinemaId !== index,
      ),
    }));
    console.log(await res.text());
  },
}));
