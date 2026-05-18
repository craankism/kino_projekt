import { create } from "zustand";

export type Cinema = {
  cinemaIndex: number;
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
  addCinema: (cinema: Cinema) => void;
  getCinemaList: () => void;
  deleteCinema: (index: number) => void;
};

const url = "https://crudcrud.com/api/3ff16de6566e4c62aafa164fdb847bb7/cinema/";

export const useCinemaStore = create<CinemaState>((set) => ({
  cinemaList: [],
  addCinema: (cinema: Cinema) => {
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

  deleteCinema: (index) => {
    set((state) => {
      fetch(url + state.cinemaList[index]._id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }).then(() => {
        set((state) => ({
          cinemaList: state.cinemaList.filter(
            (_, cinemaIndex) => cinemaIndex !== index,
          ),
        }));
      });
      return state;
    });
  },
}));
