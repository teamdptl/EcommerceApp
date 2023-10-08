package com.learn.ecommerce.Service.Implementation;
import com.learn.ecommerce.Entity.Review;
import com.learn.ecommerce.Service.ReviewService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
@Component
public class ReviewImp implements ReviewService {
    @Override
    public Optional<Review> FindByID(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<Review> FindByUserName(String userName) {
        return Optional.empty();
    }

    @Override
    public List<Review> GetAll() {
        return null;
    }

    @Override
    public void Save(Review T) {

    }

    @Override
    public void Create() {

    }

    @Override
    public void Delete() {

    }
}
