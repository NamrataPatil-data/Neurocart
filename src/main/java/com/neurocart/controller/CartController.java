package com.neurocart.controller;

import com.neurocart.entity.CartItem;
import com.neurocart.entity.Product;
import com.neurocart.entity.User;
import com.neurocart.repository.CartItemRepository;
import com.neurocart.repository.ProductRepository;
import com.neurocart.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // GET USER CART
    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(
            @PathVariable Long userId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return cartItemRepository.findByUser(user);
    }

    // ADD TO CART
    @PostMapping
    public CartItem addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        CartItem cartItem = new CartItem();

        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    // DELETE ITEM
    @DeleteMapping("/{id}")
    public String removeCartItem(
            @PathVariable Long id
    ) {

        cartItemRepository.deleteById(id);

        return "Item removed from cart";
    }

    // UPDATE QUANTITY
    @PutMapping("/{id}")
    public CartItem updateQuantity(
            @PathVariable Long id,
            @RequestParam int quantity
    ) {

        CartItem cartItem = cartItemRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found")
                );

        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }
}