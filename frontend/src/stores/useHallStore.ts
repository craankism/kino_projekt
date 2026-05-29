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
  addHall: (hall: NewHall) => Promise<void>;
  getHall: (index: number) => void;
  getHallList: () => void;
  editHall: (hall: NewHall, index: number) => void;
  deleteHall: (index: number) => void;
};

const url = "http://localhost:8080/api/hall";

export const useHallStore = create<hallState>((set) => ({
  hallList: [],
  currentHall: null,
  addHall: async (hall: NewHall) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(hall),
    });

    const result = await response.json();

    if (!response.ok) {
      // Throw error with the message from the backend
      throw new Error(result.message || "Ein Fehler ist aufgetreten");
    }

    console.log(result);
    set((state) => ({ hallList: [...state.hallList, result] }));
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

  deleteHall: (index) => {
    fetch(url + "/" + index, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        set((state) => ({
          hallList: state.hallList.filter((hall) => hall.hallId !== index),
        }));
        return res.text();
      })
      .then((text) => {
        console.log(text);
      });
  },
}));
