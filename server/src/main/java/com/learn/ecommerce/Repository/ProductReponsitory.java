 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface ProductReponsitory extends JpaRepository<Product,Integer>{
}