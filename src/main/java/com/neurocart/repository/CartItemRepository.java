package com.neurocart.repository;

import com.neurocart.entity.CartItem;
import com.neurocart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUser(User user);
}