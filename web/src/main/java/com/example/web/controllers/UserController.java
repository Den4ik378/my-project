package com.example.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.web.models.User;
import com.example.web.repositories.UserRepository;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    

    @PostMapping("/api/register")
    public User registerUser(@RequestBody User user) {

    
        User savedUser = userRepository.save(user);

    return savedUser;
    }
}
