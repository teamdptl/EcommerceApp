 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.OrderCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface OrderCouponReponsitory extends JpaRepository<OrderCoupon,Integer>{
}