package com.plant_pals.server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Role;
import com.plant_pals.server.entity.User;
import com.plant_pals.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User createUser(User user) {
        user.setRole(Role.USER);
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public User login(String name, String password) {
        User user = userRepository.findByName(name).orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(password, user.getPasswordHash())) {
            return user;
        } else {
            throw new RuntimeException("Invalid password");
        }
    }
}
