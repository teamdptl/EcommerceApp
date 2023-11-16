package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
  Optional<User> findByUsername(String username);
}
