package com.plant_pals.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}