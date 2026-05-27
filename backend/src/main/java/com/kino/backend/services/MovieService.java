package com.kino.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kino.backend.dtos.req.CreateMovieDTO;
import com.kino.backend.dtos.req.UpdateMovieDTO;
import com.kino.backend.dtos.res.ShowMovieDTO;
import com.kino.backend.entities.Hall;
import com.kino.backend.entities.Movie;
import com.kino.backend.enums.SupportedMovieVersion;
import com.kino.backend.repos.HallRepo;
import com.kino.backend.repos.MovieRepo;

@Service
public class MovieService {

    private final MovieRepo movieRepo;
    private final HallRepo hallRepo;

    public MovieService(MovieRepo movieRepo, HallRepo hallRepo) {
        this.movieRepo = movieRepo;
        this.hallRepo = hallRepo;
    }

    public ShowMovieDTO createMovie(CreateMovieDTO createMovieDTO) {
        Movie movie = new Movie();
        movie.setTitle(createMovieDTO.getTitle());
        movie.setMainCharacter(createMovieDTO.getMainCharacter());
        movie.setDescription(createMovieDTO.getDescription());
        movie.setPremieredAt(createMovieDTO.getPremieredAt());
        movie.setMovieVersion(createMovieDTO.getMovieVersion());
        movieRepo.save(movie);

        for (int hallId : createMovieDTO.getHalls()) {
            Hall hall = hallRepo.findById(hallId)
                    .orElseThrow(() -> new RuntimeException("Hall not found with id: " + hallId));
            hall.getMovieList().add(movie);
            movie.getHallList().add(hall);
            hallRepo.save(hall);
        }

        return convertEntitiyToDto(movie);
    }

    public ShowMovieDTO updateMovie(UpdateMovieDTO updateMovieDTO) {
        Movie movie = movieRepo.findById(updateMovieDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        movie.setTitle(updateMovieDTO.getTitle());
        movie.setMainCharacter(updateMovieDTO.getMainCharacter());
        movie.setDescription(updateMovieDTO.getDescription());
        movie.setPremieredAt(updateMovieDTO.getPremieredAt());
        movie.setMovieVersion(updateMovieDTO.getMovieVersion());
        movie.setHallList(updateMovieDTO.getHallList());
        movieRepo.save(movie);

        return convertEntitiyToDto(movie);
    }

    public List<ShowMovieDTO> getAllMovies() {
        List<ShowMovieDTO> movies = new ArrayList<>();
        for (Movie movie : movieRepo.findAll()) {
            movies.add(convertEntitiyToDto(movie));
        }
        return movies;
    }

    public List<ShowMovieDTO> getAllMoviesByVersion(SupportedMovieVersion movieVersion) {
        List<ShowMovieDTO> movies = new ArrayList<>();
        for (Movie movie : movieRepo.findAllByMovieVersion(movieVersion)) {
            movies.add(convertEntitiyToDto(movie));
        }
        return movies;
    }

    public ShowMovieDTO updateMovie(int movieId, List<Integer> hallList) {
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        List<Hall> newHallList = new ArrayList<>();
        for (int hallId : hallList) {
            if (hallId == 0) {
                break;
            }
            newHallList.add(hallRepo.findById(hallId).orElseThrow(() -> new RuntimeException("Hall not found")));
        }
        movie.setHallList(newHallList);
        movieRepo.save(movie);
        return convertEntitiyToDto(movie);
    }

    public ShowMovieDTO convertEntitiyToDto(Movie movie) {
        List<Integer> hallList = new ArrayList<>();
        for (Hall hall : movie.getHallList()) {
            hallList.add(hall.getHallId());
        }
        return new ShowMovieDTO(movie.getMovieId(), movie.getTitle(), movie.getMainCharacter(), movie.getDescription(),
                movie.getPremieredAt(), movie.getMovieVersion(), hallList);
    }
}
