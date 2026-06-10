package com.neurocart.service;

import com.neurocart.dto.LoginRequest;
import com.neurocart.entity.User;
import com.neurocart.repository.UserRepository;
import com.neurocart.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(User user) {

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        // Default role
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }

    public User authenticateUser(
            LoginRequest request
    ) {

        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        if (
                !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        return user;
    }

    public String generateToken(
            String email
    ) {

        return jwtUtil.generateToken(email);
    }
}