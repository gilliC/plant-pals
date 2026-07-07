package com.plant_pals.server.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.plant_pals.server.dto.SubscriptionRequest;
import com.plant_pals.server.entity.Subscription;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.repository.SubscriptionRepository;
import com.plant_pals.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public Subscription subscribe(SubscriptionRequest params) {
        User user = userRepository.findById(params.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        subscriptionRepository.findByUserIdAndPlantName(params.getUserId(), params.getPlantName())
                .ifPresent(s -> { throw new RuntimeException("Already subscribed to " + params.getPlantName()); });

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlantName(params.getPlantName());
        subscription.setCreatedAt(LocalDateTime.now());
        return subscriptionRepository.save(subscription);
    }

    public void unsubscribe(SubscriptionRequest params) {
        Subscription subscription = subscriptionRepository
                .findByUserIdAndPlantName(params.getUserId(), params.getPlantName())
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        subscriptionRepository.delete(subscription);
    }

    public List<Subscription> getSubscriptionsForUser(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }
}
