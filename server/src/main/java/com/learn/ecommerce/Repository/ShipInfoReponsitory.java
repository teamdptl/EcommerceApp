 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.ShipInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

 @Repository   public interface ShipInfoReponsitory extends JpaRepository<ShipInfo,Integer>{
  @Query("SELECT s FROM ShipInfo s WHERE s.user.id = :userId")
  List<ShipInfo> findByUserId(@Param("userId") int userId);
 }