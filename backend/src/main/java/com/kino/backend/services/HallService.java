package com.kino.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.kino.backend.dtos.req.CreateHallDTO;
import com.kino.backend.dtos.res.ShowCinemaDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.entities.Cinema;
import com.kino.backend.entities.Hall;
import com.kino.backend.enums.SupportedMovieVersion;
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

    public ShowHallDTO createHall(CreateHallDTO createHallDTO) throws Exception {
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

    public List<ShowHallDTO> getAllHalls() {
        List<ShowHallDTO> allHalls = new ArrayList<>();
        List<Hall> halls = hallRepo.findAll();
        for (Hall hall : halls) {
            allHalls.add(convertEntityToDto(hall));
        }
        return allHalls;
    }

    public ShowHallDTO getHall(int hallId) {
        Optional<Hall> optionalHall = hallRepo.findById(hallId);
        Hall hall = optionalHall.orElse(null);
        return convertEntityToDto(hall);
    }

    public ShowHallDTO updateHall(int hallId, CreateHallDTO createHallDTO) {
        Hall hall = hallRepo.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found with id: " + hallId));
        Cinema cinema = cinemaRepo.findById(createHallDTO.getCinemaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema not found"));
        boolean FiveDTO3D = hall.getSupportedMovieVersion() == SupportedMovieVersion.DBOX
                && createHallDTO.getSupportedMovieVersion() == SupportedMovieVersion.R3D;
        if (hall.getSupportedMovieVersion() == createHallDTO.getSupportedMovieVersion()) {
            hall.setCapacity(createHallDTO.getCapacity());
            hall.setCinema(cinema);
            hallRepo.save(hall);
            return convertEntityToDto(hall);
        } else if (FiveDTO3D) {
            hall.setCapacity(createHallDTO.getCapacity());
            hall.setSupportedMovieVersion(createHallDTO.getSupportedMovieVersion());
            hall.setCinema(cinema);
            hallRepo.save(hall);
            return convertEntityToDto(hall);
        } else {
            // Error handling?????
            return convertEntityToDto(hall);
        }
    }

    public String deleteHall(int hallId) {
        for (Hall hall : hallRepo.findAll()) {
            if (hall.getHallId() == hallId) {
                hallRepo.delete(hall);
                return "Saal gelöscht!";
            }
        }
        return "Saal nicht gefunden";
    }

    public ShowHallDTO convertEntityToDto(Hall hall) {
        Cinema cinema = hall.getCinema();
        ShowCinemaDTO cinemaDto = new ShowCinemaDTO(
                cinema.getCinemaId(),
                cinema.getName(),
                cinema.getAddress(),
                cinema.getManagerName(),
                cinema.getMaxCountRooms());

        return new ShowHallDTO(
                hall.getHallId(),
                hall.getCapacity(),
                hall.getSupportedMovieVersion(),
                cinemaDto);
    }
}
