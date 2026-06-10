package com.neurocart.controller;

import com.neurocart.entity.Product;
import com.neurocart.entity.Review;
import com.neurocart.repository.ProductRepository;
import com.neurocart.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{productId}")
    public List<Review> getReviews(
            @PathVariable Long productId
    ) {

        return reviewRepository
                .findByProductId(productId);
    }

    @PostMapping("/{productId}")
    public Review addReview(
            @PathVariable Long productId,
            @RequestBody Review review
    ) {

        review.setProductId(productId);

        Review savedReview =
                reviewRepository.save(review);

        // Calculate average rating
        List<Review> reviews =
                reviewRepository.findByProductId(productId);

        double totalRating = 0;

        for (Review r : reviews) {

            totalRating += r.getRating();
        }

        double averageRating =
                totalRating / reviews.size();

        Product product =
                productRepository
                        .findById(productId)
                        .orElse(null);

        if (product != null) {

            product.setRating(
                    Math.round(
                            averageRating * 10.0
                    ) / 10.0
            );

            productRepository.save(product);
        }

        return savedReview;
    }
}