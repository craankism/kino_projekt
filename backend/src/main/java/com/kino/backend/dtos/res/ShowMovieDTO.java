package com.kino.backend.dtos.res;

import java.util.List;

import com.kino.backend.enums.SupportedMovieVersion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShowMovieDTO {
    private int movieId;
    private String title;
    private String mainCharacter;
    private String description;
    private String premieredAt;
    private SupportedMovieVersion movieVersion;
    private List<Integer> hallList;
}
