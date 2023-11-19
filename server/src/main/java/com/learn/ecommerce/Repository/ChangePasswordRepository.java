package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Entity.ChangePassword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChangePasswordRepository extends JpaRepository<ChangePassword,String> {
}
