package com.plant_pals.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.Request;
import com.plant_pals.server.entity.RequestStatus;

public interface RequestRepository extends JpaRepository<Request, Long> {
    Iterable<Request> findByUserId(Long userId);

    Iterable<Request> findByStatus(RequestStatus status);

    long countByStatus(RequestStatus status);

    boolean existsByUserIdAndPlantIdAndStatus(Long userId, Long plantId, RequestStatus status);

    long countByPlantIdAndStatus(Long plantId, RequestStatus status);
}
