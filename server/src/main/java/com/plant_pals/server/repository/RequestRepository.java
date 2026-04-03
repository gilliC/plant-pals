package com.plant_pals.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
