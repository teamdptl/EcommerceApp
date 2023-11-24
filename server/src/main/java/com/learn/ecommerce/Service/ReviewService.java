 package com.learn.ecommerce.Service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.Review;
 @Service
 public interface ReviewService extends RootService<Review, Integer>{
    public List<Review> getReviewByProduct(Product product);
}