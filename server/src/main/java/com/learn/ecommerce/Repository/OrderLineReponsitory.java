 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository
 public interface OrderLineReponsitory extends JpaRepository<OrderLine,Integer>{
}