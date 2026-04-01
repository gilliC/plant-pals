package com.plant_pals.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@CrossOrigin
@RestController
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @GetMapping("/categories")
    public String[] categories() {
        return new String[]{"All", "Succulents", "For Beginners", "Advanced", "Shadow Lovers"};
    }

    @GetMapping("/plants")
    public Plant[] plants(@RequestParam(value = "category", defaultValue = "All") String category) {
        Plant[] plants = new Plant[]{
            new Plant("Aloe Vera", "Succulents", "Aloe Vera is a succulent plant species of the genus Aloe.", "Aloe vera is a succulent plant species of the genus Aloe. It grows wild in tropical climates around the world and is cultivated for agricultural and medicinal uses. It is also used for decorative purposes and grows successfully indoors as a potted plant.", "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", WateringDifficulty.EASY, SunlightRequirement.MEDIUM, "Snake Plant"),
            new Plant("Snake Plant", "For Beginners", "The snake plant is a hardy, low-maintenance houseplant.", "The snake plant (Sansevieria trifasciata) is a hardy, low-maintenance houseplant that is native to West Africa. It is known for its long, upright leaves that are typically green with yellow or white edges. The snake plant is popular for its ability to thrive in low light conditions and its air-purifying qualities.", "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", WateringDifficulty.EASY, SunlightRequirement.LOW, "Aloe Vera"),
            new Plant("Fiddle Leaf Fig", "Advanced", "The fiddle leaf fig is a popular indoor plant known for its large, glossy leaves.", "The fiddle leaf fig (Ficus lyrata) is a popular indoor plant known for its large, glossy leaves that resemble the shape of a fiddle or violin. It is native to western Africa and can grow up to 10 feet tall indoors. The fiddle leaf fig requires bright, indirect light and regular watering to thrive.", "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", WateringDifficulty.MEDIUM, SunlightRequirement.HIGH, "ZZ Plant"),
            new Plant("ZZ Plant", "Shadow Lovers", "The ZZ plant is a low-maintenance houseplant that can tolerate low light conditions.", "The ZZ plant (Zamioculcas zamiifolia) is a low-maintenance houseplant that can tolerate low light conditions. It is native to eastern Africa and has glossy, dark green leaves that grow on thick, fleshy stems. The ZZ plant is known for its ability to survive in neglectful conditions, making it an ideal choice for beginners or those with less-than-green thumbs.", "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", WateringDifficulty.EASY, SunlightRequirement.LOW, "Fiddle Leaf Fig")
        };

        return plants;
    }
}
