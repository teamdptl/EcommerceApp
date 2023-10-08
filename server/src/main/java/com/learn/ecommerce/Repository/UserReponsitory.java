 package com.learn.ecommerce.Repository; 
import com.learn.ecommerce.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface UserReponsitory extends JpaRepository<User,Integer>{
}