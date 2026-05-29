package com.kino.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kino.backend.dtos.req.CreateCinemaDTO;
import com.kino.backend.dtos.res.ShowCinemaDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.entities.Cinema;
import com.kino.backend.entities.Hall;
import com.kino.backend.exceptions.ResourceNotFoundException;
import com.kino.backend.repos.CinemaRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CinemaService {

    private final CinemaRepo cinemaRepo;

    public ShowCinemaDTO createCinema(CreateCinemaDTO createCinemaDTO) {
        Cinema cinema = new Cinema();
        cinema.setName(createCinemaDTO.getName());
        cinema.setAddress(createCinemaDTO.getAddress());
        cinema.setManagerName(createCinemaDTO.getManagerName());
        cinema.setMaxCountRooms(createCinemaDTO.getMaxCountRooms());
        cinema.setRoomCounter(0);
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
        Cinema cinema = optionalCinema.orElseThrow(() -> new ResourceNotFoundException("Cinema not found"));
        return convertEntityToDto(cinema);
    }

    public String deleteCinema(int cinemaId) {
        Optional<Cinema> optionalCinema = cinemaRepo.findById(cinemaId);
        Cinema cinema = optionalCinema.orElseThrow(() -> new ResourceNotFoundException("Cinema not found"));
        for (Hall hall : cinema.getHallList()) {
            if (hall.getCinema().getCinemaId() == cinemaId && hall.getMovieList().size() > 0) {
                throw new RuntimeException("Cannot delete cinema with movies in halls");
            }
        }
        cinemaRepo.delete(cinema);
        return "Kino gelöscht!";
    }

    public ShowCinemaDTO convertEntityToDto(Cinema cinema) {
        List<ShowHallDTO> hallList = new ArrayList<>();
        for (Hall hall : cinema.getHallList()) {
            hallList.add(new ShowHallDTO(
                    hall.getHallId(),
                    hall.getCapacity(),
                    hall.getSupportedMovieVersion(),
                    hall.getCinema().getCinemaId()));
        }
        return new ShowCinemaDTO(cinema.getCinemaId(), cinema.getName(), cinema.getAddress(), cinema.getManagerName(),
                cinema.getMaxCountRooms(), hallList);
    }
}
