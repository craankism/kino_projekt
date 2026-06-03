package com.kino.backend.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kino.backend.entities.Movie;
import com.kino.backend.enums.SupportedMovieVersion;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Integer> {

    List<Movie> findAllByMovieVersion(SupportedMovieVersion movieVersion); 
}
