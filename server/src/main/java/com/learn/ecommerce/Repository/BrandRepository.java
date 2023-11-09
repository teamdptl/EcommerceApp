package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository
 public interface BrandRepository extends JpaRepository<Brand,Integer>{
}