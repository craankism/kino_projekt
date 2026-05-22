import { create } from "zustand";
import type { Cinema } from "./useCinemaStore";

export type Hall = {
  hallId: number;
  capacity: number;
  supportedMovieVersion: string;
  cinema: Cinema;
};

export type NewHall = {
  capacity: number;
  supportedMovieVersion: string;
  cinemaId: number;
};

type hallState = {
  hallList: Hall[];
  currentHall: Hall | null;
  addHall: (hall: NewHall) => Promise<void>;
  getHall: (index: number) => Promise<void>;
  getHallList: () => Promise<void>;
  editHall: (hall: NewHall, index: number) => Promise<void>;
  deleteHall: (index: number) => Promise<void>;
};

const url = "http://localhost:8080/api/hall";

export const useHallStore = create<hallState>((set) => ({
  hallList: [],
  currentHall: null,
  addHall: async (hall: NewHall) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(hall),
    });

    const result = await res.json();
    console.log(result);
    set((state) => ({ hallList: [...state.hallList, result] }));
  },

  getHallList: async () => {
    const res = await fetch(url);
    const result = await res.json();
    set(() => ({ hallList: result }));
  },

  getHall: async (index) => {
    const res = await fetch(url + "/" + index);
    const result = await res.json();
    set(() => ({ currentHall: result }));
  },

  editHall: async (hall, index) => {
    const res = await fetch(url + "/" + index, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(hall),
    });

    const result = await res.json();
    set((state) => ({
      hallList: state.hallList.map((hall, hallId) =>
        hallId === index ? result : hall,
      ),
    }));
  },

  deleteHall: async (index) => {
    const res = await fetch(url + "/" + index, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    set((state) => ({
      hallList: state.hallList.filter((hall) => hall.hallId !== index),
    }));
    console.log(await res.text());
  },
}));
