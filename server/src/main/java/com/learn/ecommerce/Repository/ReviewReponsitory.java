 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface ReviewReponsitory extends JpaRepository<Review,Integer>{
}