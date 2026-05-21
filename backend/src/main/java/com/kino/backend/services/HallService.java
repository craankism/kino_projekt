package com.kino.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.kino.backend.dtos.req.CreateHallDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.entities.Cinema;
import com.kino.backend.entities.Hall;
import com.kino.backend.repos.CinemaRepo;
import com.kino.backend.repos.HallRepo;

@Service
public class HallService {

    private final HallRepo hallRepo;
    private final CinemaRepo cinemaRepo;

    public HallService(HallRepo hallRepo, CinemaRepo cinemaRepo) {
        this.hallRepo = hallRepo;
        this.cinemaRepo = cinemaRepo;
    }

    @PostMapping
    public ShowHallDTO createHall (CreateHallDTO createHallDTO) throws Exception {
        Cinema cinema = cinemaRepo.findById(createHallDTO.getCinemaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema not found"));
        if (cinema.getMaxCountRooms() < cinema.getCinemaId()) {
            throw new Exception("Maximale Raumanzahl überschritten!"); 
        }
        Hall hall = new Hall();
        hall.setCapacity(createHallDTO.getCapacity());
        hall.setSupportedMovieVersion(createHallDTO.getSupportedMovieVersion());
        hall.setCinema(cinema);
        hallRepo.save(hall);
        return convertEntityToDto(hall);
    }

    public ShowHallDTO convertEntityToDto(Hall hall) {
        return new ShowHallDTO(
                hall.getHallId(),
                hall.getCapacity(),
                hall.getSupportedMovieVersion(),
                hall.getCinema().getCinemaId());
    }
}
