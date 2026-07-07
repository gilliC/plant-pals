package com.plant_pals.server.messaging;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.plant_pals.server.entity.Subscription;
import com.plant_pals.server.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationListener {

    private final SubscriptionRepository subscriptionRepository;
    private final JavaMailSender mailSender;

    @Value("${notification.mail.from}")
    private String fromAddress;

    @JmsListener(
        destination = "${jms.topic.plant-notifications}",
        containerFactory = "jmsTopicListenerFactory"
    )
    public void onPlantAdded(String plantName) {
        log.info("Received plant-added notification for '{}'", plantName);

        List<Subscription> subscribers = subscriptionRepository.findByPlantName(plantName);
        if (subscribers.isEmpty()) {
            return;
        }

        for (Subscription subscription : subscribers) {
            String email = subscription.getUser().getEmail();
            if (email == null || email.isBlank()) {
                log.warn("User {} has no email address — skipping notification", subscription.getUser().getId());
            } else {
                sendEmail(email, plantName);
            }
            subscriptionRepository.delete(subscription);
        }

        log.info("Notified {} subscriber(s) for '{}'", subscribers.size(), plantName);
    }

    private void sendEmail(String to, String plantName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(to);
            message.setSubject("A " + plantName + " is now available on Plant Pals!");
            message.setText(
                "Good news! A " + plantName + " you were waiting for has just been listed on Plant Pals.\n\n" +
                "Head over to the site to request adoption before someone else does!\n\n" +
                "— The PlantPals Team"
            );
            mailSender.send(message);
            log.info("Notification email sent to {}", to);
        } catch (Exception e) {
            log.error("Failed to send notification email to {}: {}", to, e.getMessage());
        }
    }
}
