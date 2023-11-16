 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

 @Repository

 public interface MediaRepository extends JpaRepository<Media,Integer>{
  @Query("SELECT m FROM Media m WHERE m.product.productId = :productId and m.isPrimary = true")
  public Optional<Media> findByProductPrimary(Integer productId);
 }