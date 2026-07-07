package com.plant_pals.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findByPlantName(String plantName);

    Optional<Subscription> findByUserIdAndPlantName(Long userId, String plantName);

    List<Subscription> findByUserId(Long userId);
}
