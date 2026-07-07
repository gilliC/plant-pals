package com.plant_pals.server.messaging;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.plant_pals.server.entity.Plant;

import jakarta.jms.Topic;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationPublisher {

    private final JmsTemplate jmsTopicTemplate;
    private final Topic plantNotificationsTopic;

    public void plantAdded(Plant plant) {
        String plantName = plant.getName();
        log.info("Publishing plant-added notification for '{}'", plantName);
        jmsTopicTemplate.convertAndSend(plantNotificationsTopic, plantName);
    }
}
