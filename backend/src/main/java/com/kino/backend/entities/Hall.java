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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hallId;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private SupportedMovieVersion supportedMovieVersion;

    @ManyToOne
    @JoinColumn(name = "cinemaId")
    private Cinema cinema;

    @ManyToMany(mappedBy = "hallList")
    private List<Movie> movieList = new ArrayList<>();
}
