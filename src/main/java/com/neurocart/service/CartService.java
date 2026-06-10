package com.neurocart.service;

import com.neurocart.entity.*;
import com.neurocart.entity.User;
import com.neurocart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // ➕ Add to cart
    public CartItem addToCart(Long productId, int quantity, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartRepository.save(cartItem);
    }

    // 📋 View cart
    public List<CartItem> getCart(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return cartRepository.findByUser(user);
    }

    // ❌ Remove item
    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }
}