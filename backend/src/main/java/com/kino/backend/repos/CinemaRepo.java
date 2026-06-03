package com.kino.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kino.backend.entities.Cinema;

@Repository
public interface CinemaRepo extends JpaRepository<Cinema, Integer> {
}
