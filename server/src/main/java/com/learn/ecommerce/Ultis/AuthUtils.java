package com.learn.ecommerce.Ultis;

import com.learn.ecommerce.user.User;
import com.learn.ecommerce.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUtils {
    @Autowired
    private static UserRepository repository;
    public static Optional<User> getCurrentUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return repository.findByUsername(userDetails.getUsername());
    }
}
