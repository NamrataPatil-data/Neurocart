package com.neurocart.service;

import com.neurocart.entity.Order;
import com.neurocart.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // ✅ PLACE ORDER
    public Order placeOrder(Order order) {

        return orderRepository.save(order);
    }

    // ✅ GET ALL ORDERS
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }
}