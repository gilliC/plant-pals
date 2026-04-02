package com.plant_pals.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.Plant;

// DB OPERATIONS. when extending JpaRepository, we get findAll, findById, save, deleteById, etc.
public interface PlantRepository extends JpaRepository<Plant, Long> {
}
