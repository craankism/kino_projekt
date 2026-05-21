package com.kino.backend.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateCinemaDTO {
    private String name;
    private String address;
    private String managerName;
    private int maxCountRooms;
}
