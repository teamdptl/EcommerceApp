 package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository

 public interface MediaRepository extends JpaRepository<Media,Integer>{

 }