package com.learn.ecommerce.Repository;
import com.learn.ecommerce.Entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

 @Repository   public interface BranchReponsitory extends JpaRepository<Branch,Integer>{
}