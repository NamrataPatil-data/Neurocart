package com.neurocart.controller;

import com.neurocart.entity.Order;
import com.neurocart.entity.User;
import com.neurocart.repository.OrderRepository;
import com.neurocart.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // PLACE ORDER
    @PostMapping
    public Order placeOrder(
            @RequestParam Long userId,
            @RequestBody Order order
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        order.setUser(user);

        if(order.getStatus() == null) {
            order.setStatus("Order Placed");
        }

        return orderRepository.save(order);
    }

    // GET USER ORDERS
    @GetMapping("/{userId}")
    public List<Order> getOrders(
            @PathVariable Long userId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return orderRepository.findByUser(user);
    }

    @PutMapping("/{orderId}/status")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }
}