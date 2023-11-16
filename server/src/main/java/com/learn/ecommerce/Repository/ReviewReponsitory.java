 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


 @Repository   
 public interface ReviewReponsitory extends JpaRepository<Review,Integer>{

    List<Review> findByProduct(Product product);
}