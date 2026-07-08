package com.plant_pals.server;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.plant_pals.server.dto.CreateRequestParams;
import com.plant_pals.server.dto.UpdateRequestParams;
import com.plant_pals.server.entity.Category;
import com.plant_pals.server.entity.Difficulty;
import com.plant_pals.server.entity.Plant;
import com.plant_pals.server.entity.PlantStatus;
import com.plant_pals.server.entity.RequestStatus;
import com.plant_pals.server.entity.Role;
import com.plant_pals.server.entity.Sunlight;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.entity.WateringLevel;
import com.plant_pals.server.repository.CategoryRepository;
import com.plant_pals.server.repository.PlantRepository;
import com.plant_pals.server.repository.RequestRepository;
import com.plant_pals.server.repository.UserRepository;
import com.plant_pals.server.service.RequestService;
import com.plant_pals.server.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Profile("seed")
@Component
@RequiredArgsConstructor
public class DevDataSeeder implements ApplicationRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final CategoryRepository categoryRepository;
    private final RequestRepository requestRepository;
    private final RequestService requestService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("== Seeding dev data ==");

        User admin = ensureUser("admin", "admin123", "admin@dev.local");
        if (admin.getRole() != Role.ADMIN) {
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            log.info("Promoted 'admin' to ADMIN");
        } else {
            log.info("'admin' is already ADMIN");
        }

        User demo = ensureUser("demo", "demo123", "demo@dev.local");

        seedPlants();

        List<Plant> plants = plantRepository.findAll();
        seedRequest(demo, admin, plants, "Monstera Deliciosa", RequestStatus.APPROVED);
        seedRequest(demo, admin, plants, "Snake Plant",        RequestStatus.PENDING);
        seedRequest(demo, admin, plants, "Fiddle Leaf Fig",    RequestStatus.REJECTED);

        log.info("== Seed complete ==");
    }

    private User ensureUser(String name, String password, String email) {
        return userRepository.findByName(name).orElseGet(() -> {
            User u = userService.createUser(name, password, email);
            log.info("Created user '{}'", name);
            return u;
        });
    }

    private void seedPlants() {
        Set<String> existing = plantRepository.findAll().stream()
                .map(Plant::getName)
                .collect(Collectors.toSet());

        List<Plant> toSeed = List.of(
            plant("Monstera Deliciosa", "Houseplants",
                "The iconic split-leaf philodendron cousin",
                "A large, fast-growing tropical vine known for its dramatic fenestrated leaves. Great statement plant for bright rooms.",
                "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
                WateringLevel.MEDIUM, Sunlight.INDIRECT, Difficulty.BEGINNER, "Philodendron"),
            plant("Snake Plant", "Succulents",
                "Nearly indestructible, air-purifying favorite",
                "Stiff upright leaves that tolerate neglect, low light, and irregular watering better than almost any houseplant.",
                "https://images.unsplash.com/photo-1572688484438-313a6e50c333",
                WateringLevel.LOW, Sunlight.SHADE, Difficulty.BEGINNER, "ZZ Plant"),
            plant("Fiddle Leaf Fig", "Houseplants",
                "Big glossy leaves, big personality",
                "A striking indoor tree with large violin-shaped leaves. Sensitive to drafts and inconsistent watering.",
                "https://images.unsplash.com/photo-1545239705-1564e58b9e4a",
                WateringLevel.MEDIUM, Sunlight.FULL, Difficulty.ADVANCED, "Rubber Plant"),
            plant("Pothos", "Vines",
                "Fast-growing trailing vine for beginners",
                "One of the easiest houseplants to grow, tolerant of low light and irregular watering, great for hanging baskets.",
                "https://images.unsplash.com/photo-1596724878582-76f1a8fdc24f",
                WateringLevel.LOW, Sunlight.PARTIAL, Difficulty.BEGINNER, "Philodendron"),
            plant("Basil", "Herbs",
                "Fragrant kitchen herb, loves the sun",
                "Fast-growing culinary herb that needs consistent watering and plenty of direct sunlight to thrive.",
                "https://images.unsplash.com/photo-1618375569909-3c8616cf7733",
                WateringLevel.HIGH, Sunlight.FULL, Difficulty.INTERMEDIATE, "Mint")
        );

        for (Plant p : toSeed) {
            if (existing.contains(p.getName())) {
                log.info("Skip plant '{}' (already exists)", p.getName());
            } else {
                Category category = categoryRepository.findByName(p.getCategory().getName())
                        .orElseGet(() -> categoryRepository.save(p.getCategory()));
                p.setCategory(category);
                plantRepository.save(p);
                log.info("Created plant '{}'", p.getName());
            }
        }
    }

    private void seedRequest(User demo, User admin, List<Plant> plants,
                             String plantName, RequestStatus targetStatus) {
        Plant plant = plants.stream()
                .filter(p -> p.getName().equals(plantName))
                .findFirst().orElse(null);
        if (plant == null) {
            log.warn("Skip request for '{}' (plant not found)", plantName);
            return;
        }

        if (requestRepository.existsByUserIdAndPlantId(demo.getId(), plant.getId())) {
            log.info("Skip request for '{}' (already exists)", plantName);
            return;
        }

        CreateRequestParams create = new CreateRequestParams();
        create.setUserId(demo.getId());
        create.setPlantId(plant.getId());
        var request = requestService.createRequest(create);

        UpdateRequestParams update = new UpdateRequestParams();
        update.setRequestId(request.getId());
        update.setUserId(admin.getId());

        switch (targetStatus) {
            case APPROVED -> requestService.approveRequest(update);
            case REJECTED -> requestService.rejectRequest(update);
            default -> { /* leave as PENDING */ }
        }

        log.info("Created request for '{}' (status={})", plantName, targetStatus);
    }

    private Plant plant(String name, String categoryName, String shortDesc, String desc,
                        String photoUrl, WateringLevel watering, Sunlight sunlight,
                        Difficulty difficulty, String similarTo) {
        Category cat = new Category();
        cat.setName(categoryName);

        Plant p = new Plant();
        p.setCategory(cat);
        p.setName(name);
        p.setShortDescription(shortDesc);
        p.setDescription(desc);
        p.setPhotoUrl(photoUrl);
        p.setWateringDifficulty(watering);
        p.setSunlight(sunlight);
        p.setDifficulty(difficulty);
        p.setSimilarTo(similarTo);
        p.setStatus(PlantStatus.AVAILABLE);
        LocalDateTime now = LocalDateTime.now();
        p.setCreatedAt(now);
        p.setUpdatedAt(now);
        return p;
    }
}
