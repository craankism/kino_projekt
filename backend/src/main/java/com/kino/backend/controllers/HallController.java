package com.kino.backend.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kino.backend.dtos.req.CreateHallDTO;
import com.kino.backend.dtos.res.ShowHallDTO;
import com.kino.backend.services.HallService;

@RestController
@RequestMapping("api/hall")
public class HallController {

    private final HallService hallService;

    public HallController(HallService hallService) {
        this.hallService = hallService;
    }

    public ShowHallDTO createHall(@RequestBody CreateHallDTO createHallDTO) throws Exception {
        return hallService.createHall(createHallDTO);
    }

}
