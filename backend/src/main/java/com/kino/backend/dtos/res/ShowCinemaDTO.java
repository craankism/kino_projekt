package com.kino.backend.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShowCinemaDTO {
    private int cinemaId;
    private String name;
    private String address;
    private String managerName;
    private int maxCountRooms;
}
