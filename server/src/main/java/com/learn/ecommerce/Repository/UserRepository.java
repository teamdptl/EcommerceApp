package com.learn.ecommerce.Repository;

import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Entity.ShipInfo;
import com.learn.ecommerce.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
  Optional<User> findByEmail(String email);
  Optional<User> findByUsername(String username);



}
