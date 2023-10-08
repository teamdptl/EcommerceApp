 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.ShipInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface ShipInfoReponsitory extends JpaRepository<ShipInfo,Integer>{
}