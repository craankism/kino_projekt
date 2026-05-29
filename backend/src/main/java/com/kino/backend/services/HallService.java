package com.kino.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kino.backend.dtos.req.CreateHallDTO;
import com.kino.backend.dtos.req.UpdateHallDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.entities.Cinema;
import com.kino.backend.entities.Hall;
import com.kino.backend.enums.SupportedMovieVersion;
import com.kino.backend.exceptions.ResourceNotFoundException;
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

    public ShowHallDTO createHall(CreateHallDTO createHallDTO) {
        Cinema cinema = cinemaRepo.findById(createHallDTO.getCinemaId())
                .orElseThrow(() -> new ResourceNotFoundException("Kino wurde nicht gefunden!"));
        if (cinema.getHallList().size() >= cinema.getMaxCountRooms()) {
            throw new RuntimeException("Maximale Raumanzahl überschritten!");
        }
        Hall hall = new Hall();
        hall.setCapacity(createHallDTO.getCapacity());
        hall.setSupportedMovieVersion(createHallDTO.getSupportedMovieVersion());
        hall.setCinema(cinema);
        hallRepo.save(hall);
        return convertEntityToDto(hall);
    }

    public List<ShowHallDTO> getAllHalls() {
        List<ShowHallDTO> allHallList = new ArrayList<>();
        List<Hall> hallList = hallRepo.findAll();
        for (Hall hall : hallList) {
            allHallList.add(convertEntityToDto(hall));
        }
        return allHallList;
    }

    public ShowHallDTO getHall(int hallId) {
        Optional<Hall> optionalHall = hallRepo.findById(hallId);
        Hall hall = optionalHall.orElse(null);
        return convertEntityToDto(hall);
    }

    public ShowHallDTO updateHall(int hallId, UpdateHallDTO updateHallDTO) {
        Hall hall = hallRepo.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found with id: " + hallId));
        boolean FiveDTO3D = hall.getSupportedMovieVersion() == SupportedMovieVersion.DBOX
                && updateHallDTO.getSupportedMovieVersion() == SupportedMovieVersion.R3D;
        if (hall.getSupportedMovieVersion() == updateHallDTO.getSupportedMovieVersion()) {
            hall.setCapacity(updateHallDTO.getCapacity());
            hallRepo.save(hall);
            return convertEntityToDto(hall);
        } else if (FiveDTO3D) {
            hall.setCapacity(updateHallDTO.getCapacity());
            hall.setSupportedMovieVersion(updateHallDTO.getSupportedMovieVersion());
            hallRepo.save(hall);
            return convertEntityToDto(hall);
        } else {
            throw new RuntimeException("Change in movie version not allowed!");
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
        return new ShowHallDTO(
                hall.getHallId(),
                hall.getCapacity(),
                hall.getSupportedMovieVersion(),
                hall.getCinema().getCinemaId());
    }
}
