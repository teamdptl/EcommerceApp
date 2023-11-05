package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Review;
import com.learn.ecommerce.Service.ReviewService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ReviewImp implements ReviewService {
    public Optional<Review> FindByID(int id) {
        return Optional.empty();
    }

    public Optional<Review> FindByUserName(String userName) {
        return Optional.empty();
    }

    public List<Review> GetAll() {
        return null;
    }

    public void Save(Review T) {

    }

    public void Create() {

    }

    public void Delete() {

    }
}
