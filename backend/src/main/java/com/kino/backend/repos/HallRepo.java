package com.kino.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kino.backend.entities.Hall;

@Repository
public interface HallRepo extends JpaRepository<Hall, Integer> {
}
