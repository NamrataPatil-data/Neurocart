package com.neurocart.controller;

import com.neurocart.repository.OrderRepository;
import com.neurocart.repository.ProductRepository;
import com.neurocart.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminStatsController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats =
                new HashMap<>();

        long totalProducts =
                productRepository.count();

        long totalUsers =
                userRepository.count();

        long totalOrders =
                orderRepository.count();

        double revenue =
                orderRepository.findAll()
                        .stream()
                        .mapToDouble(order ->
                                order.getTotalAmount() == null
                                        ? 0
                                        : order.getTotalAmount())
                        .sum();

        stats.put("products", totalProducts);
        stats.put("users", totalUsers);
        stats.put("orders", totalOrders);
        stats.put("revenue", revenue);

        return stats;
    }
}