 package com.learn.ecommerce.Repository; 
import com.learn.ecommerce.Entity.WashMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface WashMachineReponsitory extends JpaRepository<WashMachine,Integer>{
}