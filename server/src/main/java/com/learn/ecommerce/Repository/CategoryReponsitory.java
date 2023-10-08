 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface CategoryReponsitory extends JpaRepository<Category,Integer>{
}