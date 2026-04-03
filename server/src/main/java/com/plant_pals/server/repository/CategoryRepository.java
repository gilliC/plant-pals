package com.plant_pals.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
