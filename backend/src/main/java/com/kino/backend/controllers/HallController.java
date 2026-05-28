package com.kino.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kino.backend.dtos.req.CreateHallDTO;
import com.kino.backend.dtos.req.UpdateHallDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.services.HallService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/hall")
public class HallController {

    private final HallService hallService;


    @PostMapping
    public ShowHallDTO createHall(@RequestBody CreateHallDTO createHallDTO) {
        return hallService.createHall(createHallDTO);
    }

    @GetMapping
    public List<ShowHallDTO> getAllHalls() {
        return hallService.getAllHalls();
    }

    @GetMapping("/{hallId}")
    public ShowHallDTO getHall(@PathVariable int hallId) {
        return hallService.getHall(hallId);
    }

    @PutMapping("/{hallId}")
    public ShowHallDTO updateHall(@PathVariable int hallId, @RequestBody UpdateHallDTO updateHallDTO) {
        return hallService.updateHall(hallId, updateHallDTO);
    }

    @DeleteMapping("/{hallId}")
    public String deleteHall(@PathVariable int hallId) {
        return hallService.deleteHall(hallId);
    }

}
