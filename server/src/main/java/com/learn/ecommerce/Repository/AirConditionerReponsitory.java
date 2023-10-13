package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.AirConditioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface AirConditionerReponsitory extends JpaRepository<AirConditioner,Integer>{
}