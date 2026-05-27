package com.kino.backend.entities;

import java.util.ArrayList;
import java.util.List;

import com.kino.backend.enums.SupportedMovieVersion;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieId;

    @Column(nullable = false)
    private String title;
    private String mainCharacter;
    private String description;
    private String premieredAt;

    @Column(nullable = false)
    private SupportedMovieVersion movieVersion;

    @ManyToMany
    @JoinTable(name = "movie_plays_in", joinColumns = @JoinColumn(name = "movieId"), inverseJoinColumns = @JoinColumn(name = "hallId"))
    private List<Hall> hallList = new ArrayList<>();

}
