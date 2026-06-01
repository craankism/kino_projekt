package com.kino.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kino.backend.dtos.req.CreateMovieDTO;
import com.kino.backend.dtos.res.ShowMovieDTO;
import com.kino.backend.enums.SupportedMovieVersion;
import com.kino.backend.services.MovieService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/movie")
public class MovieController {
    
    private final MovieService movieService;

    @PostMapping
    public ShowMovieDTO createMovie(@RequestBody CreateMovieDTO createMovieDTO) throws Exception {
        return movieService.createMovie(createMovieDTO);
    }

    @GetMapping
    public List<ShowMovieDTO> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{movieVersion}")
    public List<ShowMovieDTO> getAllMoviesByVersion(@PathVariable SupportedMovieVersion movieVersion) {
        return movieService.getAllMoviesByVersion(movieVersion);
    }

    @PutMapping("/{movieId}")
    public ShowMovieDTO updateMovie(@PathVariable int movieId, @RequestBody List<Integer> hallList) {
        return movieService.updateMovie(movieId, hallList);
    }
}
