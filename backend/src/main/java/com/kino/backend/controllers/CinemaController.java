package com.kino.backend.controllers;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kino.backend.dtos.req.CreateCinemaDTO;
import com.kino.backend.dtos.res.ShowCinemaDTO;
import com.kino.backend.services.CinemaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/cinema")
public class CinemaController {

    private final CinemaService cinemaService;

    @PostMapping
    public ShowCinemaDTO createCinema(@RequestBody CreateCinemaDTO createCinemaDTO) {
        return cinemaService.createCinema(createCinemaDTO);
    }

    @GetMapping
    public List<ShowCinemaDTO> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @GetMapping("/{cinemaId}")
    public ShowCinemaDTO getCinema(@PathVariable int cinemaId) {
        return cinemaService.getCinema(cinemaId);
    }

    @DeleteMapping("/{cinemaId}")
    public String deleteCinema(@PathVariable int cinemaId) {
        return cinemaService.deleteCinema(cinemaId);
    }
}
