package com.learn.ecommerce.Ultis;

import com.learn.ecommerce.user.User;
import com.learn.ecommerce.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUtils {
    @Autowired
    private UserRepository repository;
    
    public Optional<User> getCurrentUser(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if(email == null)
            return repository.findByEmail("");
        return repository.findByEmail(email);
        
    }
}
