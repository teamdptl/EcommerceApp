package com.learn.ecommerce.Ultis;

import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUtils {
    @Autowired
    private UserRepository repository;
    
    public Optional<User> getCurrentUser(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        if(email == null)
            return null;
        return repository.findByEmail(email);
        
    }
}
