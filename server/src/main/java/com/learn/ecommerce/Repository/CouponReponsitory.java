 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface CouponReponsitory extends JpaRepository<Coupon,Integer>{
}