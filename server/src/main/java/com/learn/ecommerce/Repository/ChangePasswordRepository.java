package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Category;
import com.learn.ecommerce.Entity.ChangePassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChangePasswordRepository extends JpaRepository<ChangePassword,String> {
    Optional<ChangePassword> findByUUID(String uuid);
}
