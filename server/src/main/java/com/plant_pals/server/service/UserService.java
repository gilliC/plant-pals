package com.plant_pals.server.service;

import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Role;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.repository.UserRepository;

import at.favre.lib.crypto.bcrypt.BCrypt;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(String name, String password) {
        User user = new User();
        user.setName(name);
        user.setRole(Role.USER);
        String hashed = BCrypt.withDefaults().hashToString(12, password.toCharArray());
        user.setPasswordHash(hashed);
        return userRepository.save(user);
    }

    public User login(String name, String password) {
        User user = userRepository.findByName(name).orElseThrow(() -> new RuntimeException("User not found"));
        boolean correct = BCrypt.verifyer().verify(password.toCharArray(), user.getPasswordHash()).verified;
        if (correct) {
            return user;
        } else {
            throw new RuntimeException("Invalid password");
        }
    }
}
