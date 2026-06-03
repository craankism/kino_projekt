import { create } from "zustand";

export type Hall = {
  hallId: number;
  capacity: number;
  supportedMovieVersion: string;
  cinemaId: number;
};

export type NewHall = {
  capacity: number;
  supportedMovieVersion: string;
  cinemaId: number;
};

type hallState = {
  hallList: Hall[];
  currentHall: Hall | null;
  addHall: (hall: NewHall) => void;
  getHall: (index: number) => void;
  getHallList: () => void;
  editHall: (hall: NewHall, index: number) => void;
};

const url = "http://localhost:8080/api/hall";

export const useHallStore = create<hallState>((set) => ({
  hallList: [],
  currentHall: null,
  addHall: (hall: NewHall) => {
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(hall),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        set((state) => ({ hallList: [...state.hallList, result] }));
      });
  },

  getHallList: () => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ hallList: result }));
      });
  },

  getHall: (index) => {
    fetch(url + "/" + index)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ currentHall: result }));
      });
  },

  editHall: (hall, index) => {
    fetch(url + "/" + index, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(hall),
    })
      .then((res) => res.json())
      .then((result) => {
        set((state) => ({
          hallList: state.hallList.map((hall, hallId) =>
            hallId === index ? result : hall,
          ),
        }));
      });
  },
}));
