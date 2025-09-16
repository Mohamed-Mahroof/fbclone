package com.example.fbclone.service;

import com.example.fbclone.model.User;
import com.example.fbclone.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(User user) {
        // Check If Email Exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.isPresent()) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            if(existingUser.get().getPassword().equals(password)) {
                return "Login successful!";
            }else {
                return "Invalid email or password!";
            }
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(password);
            userRepository.save(newUser);
            return "New Credentials captured!";
        }
        
    }
}