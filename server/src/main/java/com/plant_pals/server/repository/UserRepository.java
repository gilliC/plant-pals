package com.plant_pals.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plant_pals.server.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    java.util.Optional<User> findByName(String name);
}
