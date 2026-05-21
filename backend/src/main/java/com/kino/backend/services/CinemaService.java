package com.kino.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kino.backend.dtos.req.CreateCinemaDTO;
import com.kino.backend.dtos.res.ShowCinemaDTO;
import com.kino.backend.entities.Cinema;
import com.kino.backend.repos.CinemaRepo;

@Service
public class CinemaService {

    private final CinemaRepo cinemaRepo;

    public CinemaService(CinemaRepo cinemaRepo) {
        this.cinemaRepo = cinemaRepo;
    }

    public ShowCinemaDTO createCinema(CreateCinemaDTO createCinemaDTO) {
        Cinema cinema = new Cinema();
        cinema.setName(createCinemaDTO.getName());
        cinema.setAddress(createCinemaDTO.getAddress());
        cinema.setManagerName(createCinemaDTO.getManagerName());
        cinema.setMaxCountRooms(createCinemaDTO.getMaxCountRooms());
        cinemaRepo.save(cinema);
        return convertEntityToDto(cinema);
    }

    public List<ShowCinemaDTO> getAllCinemas() {
        List<ShowCinemaDTO> allCinemas = new ArrayList<>();
        List<Cinema> cinemas = cinemaRepo.findAll();
        for (Cinema cinema : cinemas) {
            allCinemas.add(convertEntityToDto(cinema));
        }
        return allCinemas;
    }

    public ShowCinemaDTO getCinema(int cinemaId) {
        Optional<Cinema> optionalCinema = cinemaRepo.findById(cinemaId);
        Cinema cinema = optionalCinema.orElse(null);
        return convertEntityToDto(cinema);
    }

    public String deleteCinema(int cinemaId) {
        for (Cinema cinema : cinemaRepo.findAll()) {
            if (cinema.getCinemaId() == cinemaId) {
                cinemaRepo.delete(cinema);
                return "Kino gelöscht!";
            }
        }
        return "Kino nicht gefunden";

    }

    public ShowCinemaDTO convertEntityToDto(Cinema cinema) {
        return new ShowCinemaDTO(cinema.getCinemaId(), cinema.getName(), cinema.getAddress(), cinema.getManagerName(),
                cinema.getMaxCountRooms());
    }
}
