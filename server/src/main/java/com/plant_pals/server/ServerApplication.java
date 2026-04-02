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

    // @GetMapping("/plants")
    // public Plant[] plants(@RequestParam(value = "category", defaultValue = "All") String category) throws java.io.IOException {
    //     ObjectMapper mapper = new ObjectMapper();
    //     var tree = mapper.readTree(new ClassPathResource("mockData.json").getInputStream());
    //     Plant[] plants = mapper.treeToValue(tree.get("plants"), Plant[].class);
    //     return plants;
    // }
    // @GetMapping("/plants/{id}")
    // public Plant plant(@PathVariable int id) throws java.io.IOException {
    //     ObjectMapper mapper = new ObjectMapper();
    //     var tree = mapper.readTree(new ClassPathResource("mockData.json").getInputStream());
    //     Plant[] plants = mapper.treeToValue(tree.get("plants"), Plant[].class);
    //     for (Plant plant : plants) {
    //         if (plant.id() == id) {
    //             return plant;
    //         }
    //     }
    //     return null;
    // }
}
