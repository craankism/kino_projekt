import { create } from "zustand";

export type Movie = {
  movieId: number;
  title: string;
  mainCharacter: string;
  description: string;
  premieredAt: string;
  movieVersion: string;
  hallList: Array<number>;
};

export type NewMovie = {
  title: string;
  mainCharacter: string;
  description: string;
  premieredAt: string;
  movieVersion: string;
  halls: Array<string>;
};

type MovieState = {
  movieList: Movie[];
  currentMovie: Movie | null;
  addMovie: (movie: NewMovie) => void;
  getMovie: (index: number) => void;
  getMovieList: () => void;
  updateMovie: (movieId: number, hallList: Array<number>) => void;
  deleteMovie: (index: number) => void;
};

const url = "http://localhost:8080/api/movie";

export const useMovieStore = create<MovieState>((set) => ({
  movieList: [],
  currentMovie: null,
  addMovie: (movie: NewMovie) => {
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        set((state) => ({ movieList: [...state.movieList, result] }));
      });
  },

  getMovieList: () => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ movieList: result }));
      });
  },

  getMovie: (index: number) => {
    fetch(url + "/" + index)
      .then((res) => res.json())
      .then((result) => {
        set(() => ({ currentMovie: result }));
      });
  },

  updateMovie: (movieId: number, hallList: Array<number>) => {
    fetch(url + "/" + movieId, {
      method: "PUT",
      headers: {
        "content-type": "application/JSON",
      },
      body: JSON.stringify(hallList),
    })
      .then((res) => res.json())
      .then((result) => {
        set((state) => ({
          movieList: state.movieList.map((movie) =>
            movie.movieId === movieId ? result : movie,
          ),
        }));
      });
  },

  deleteMovie: (index: number) => {
    fetch(url + "/" + index, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        set((state) => ({
          movieList: state.movieList.filter((movie) => movie.movieId !== index),
        }));
        return res.text();
      })
      .then((text) => {
        console.log(text);
      });
  },
}));
