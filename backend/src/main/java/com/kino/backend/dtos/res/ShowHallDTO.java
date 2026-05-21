package com.kino.backend.dtos.res;

import com.kino.backend.enums.SupportedMovieVersion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShowHallDTO {
    private int hallId;
    private int capacity;
    private SupportedMovieVersion supportedMovieVersion;
    private int cinemaId;
}
