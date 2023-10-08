 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Refrigerator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface RefrigeratorReponsitory extends JpaRepository<Refrigerator,Integer>{
}