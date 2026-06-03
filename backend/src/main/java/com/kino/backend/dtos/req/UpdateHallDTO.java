package com.kino.backend.dtos.req;

import com.kino.backend.enums.SupportedMovieVersion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateHallDTO {
    private int capacity;
    private SupportedMovieVersion supportedMovieVersion;
}
