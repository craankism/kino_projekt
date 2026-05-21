import { create } from "zustand";
import type { Cinema } from "./useCinemaStore";

export type Hall = {
  hallId: number;
  capacity: number;
  supportedMovies: string;
  cinema: Cinema;
};

export type NewHall = {
  capacity: number;
  supportedMovies: string;
  cinema: Cinema;
};

type hallState = {
  hallList: Hall[];
  currentHall: Hall | null;
  addHall: (hall: NewHall) => void;
  getHall: (index: number) => void;
  getHallList: () => void;
  deleteHall: (index: number) => void;
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

  deleteHall: (index) => {
    set((state) => {
      fetch(url + "/" + state.hallList[index].hallId, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          set((state) => ({
            hallList: state.hallList.filter(
              (_, hallIndex) => hallIndex !== index,
            ),
          }));
          return res.text();
        })
        .then((result) => console.log(result));
      return state;
    });
  },
}));
