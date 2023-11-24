package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.Review;
import com.learn.ecommerce.Repository.ReviewReponsitory;
import com.learn.ecommerce.Service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ReviewImp implements ReviewService {
    private final ReviewReponsitory reponsitory;
  
    ReviewImp(@Autowired ReviewReponsitory repo){
        this.reponsitory=repo;
    }

    @Override
    public Optional<Review> findById(Integer id) {
        return reponsitory.findById(id);
    }

    @Override
    public List<Review> getAll() {
        return reponsitory.findAll();
    }

    @Override
    public void save(Review T) {
        reponsitory.save(T);
    }

    @Override
    public void delete(Integer id) {
        reponsitory.deleteById(id);
    }

    @Override
    public List<Review> getReviewByProduct(Product product) {
        return reponsitory.findByProduct(product);
    }
}
